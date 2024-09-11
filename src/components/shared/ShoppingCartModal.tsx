"use client";

import { motion, AnimatePresence } from "framer-motion";
import useOutsideClick from "@/hooks/useOutsideClick";
import { ArrowLeft, Trash2, X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { openSignInModal } from "@/store/signInModalSlice";
import { useSession } from "next-auth/react";
import { clearAddedProduct, closeModal } from "@/store/storeSlice";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  IAddToCartResponse,
  ICartItem,
  IGetUserCartResponse,
  IRemoveFromCartResponse,
  IUpdateCartItemResponse,
} from "@/types/cart";
import { useRouter } from "next/navigation";
import { CartItem } from "@/gql/graphql";
import {
  addItemToCookie,
  clearCartFromCookie,
  getCartItemsFromCookie,
  removeCartItemFromCookie,
  updateCartItemInCookie,
} from "@/app/utils/cartHeplers";

const GET_AUTH_USER_CART_QUERY = `
  query GetUserCart {
    userCart {
      cart {
        cart_items {
          id
          quantity
          product {
            id
            title
            retail
            currency
            discount
            image_link
          }
        }       
      }
    }
  }
`;

const ADD_TO_CART_MUTATION = `
  mutation AddToCart($input: AddToCartInput!) {
    addToCart(input: $input) {
      cart {
        cart_items {
          id
          quantity
          product {
            id
            title
            retail
            currency
            discount
            image_link
          }
        }
      }
    }
  }
`;

const UPDATE_CART_ITEM_MUTATION = `
  mutation UpdateCartItem($input: UpdateCartItemInput!) {
    updateCartItem(input: $input) {
      cart {
        cart_items {
          id
          quantity
          product {
            id
            title
            retail
            currency
            discount
            image_link
          }
        }
      }
    }
  }
`;

const REMOVE_FROM_CART_MUTATION = `
  mutation RemoveFromCart($input: RemoveFromCartInput!) {
    removeFromCart(input: $input) {
      cart {
        cart_items {
          id
          quantity
          product {
            id
            title
            retail
            currency
            discount
            image_link
          }
        }
      }
    }
  }
`;

const fetchCart = async (): Promise<ICartItem[]> => {
  const { data } = await axios.post<IGetUserCartResponse>(
    process.env.NEXT_PUBLIC_API_URL + "/api/graphql",
    {
      query: GET_AUTH_USER_CART_QUERY,
    }
  );

  return data.userCart.cart.cart_items;
};

const addCartItem = async (newItem: ICartItem) => {
  const { data } = await axios.post<IAddToCartResponse>(
    process.env.NEXT_PUBLIC_API_URL + "/api/graphql",
    {
      query: ADD_TO_CART_MUTATION,
      variables: {
        input: {
          productId: newItem.product.id,
          quantity: newItem.quantity,
        },
      },
    }
  );
  return data.data.addToCart.cart.cart_items;
};

const updateCartItem = async ({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
}) => {
  const { data } = await axios.post<IUpdateCartItemResponse>(
    process.env.NEXT_PUBLIC_API_URL + "/api/graphql",
    {
      query: UPDATE_CART_ITEM_MUTATION,
      variables: { input: { productId, quantity } },
    }
  );
  return data.data.updateCartItem.cart.cart_items;
};

const removeCartItem = async (productId: string) => {
  const { data } = await axios.post<IRemoveFromCartResponse>(
    process.env.NEXT_PUBLIC_API_URL + "/api/graphql",
    {
      query: REMOVE_FROM_CART_MUTATION,
      variables: { input: { productId } },
    }
  );
  return data.data.removeFromCart.cart.cart_items;
};

const ShoppingCartModal = () => {
  const { isModalOpen, addedProduct } = useAppSelector((state) => state.store);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { status } = useSession();
  const router = useRouter();

  const { data: cartItems = [], isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: status === "authenticated" ? fetchCart : getCartItemsFromCookie,
    refetchOnMount: true,
  });

  const calculateTotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.product.retail * item.quantity,
      0
    );
  }, [cartItems]);

  const calculateDiscountTotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) =>
        total +
        ((item.product.retail * item.product.discount ?? 0) / 100) *
          item.quantity,
      0
    );
  }, [cartItems]);

  const addToCartMutation = useMutation({
    mutationFn: addCartItem,
    onSuccess: (newCart) => {
      queryClient.setQueryData(["cart"], newCart);
    },
  });

  const updateCartItemMutation = useMutation({
    mutationFn: updateCartItem,
    onSuccess: (newCart) => {
      queryClient.setQueryData(["cart"], newCart);
    },
  });

  const removeFromCartMutation = useMutation({
    mutationFn: removeCartItem,
    onSuccess: (newCart) => {
      queryClient.setQueryData(["cart"], newCart);
    },
  });

  useEffect(() => {
    if (addedProduct && cartItems) {
      const existingItem = cartItems.find(
        (item) => item.product.id === addedProduct.product.id
      );

      if (status === "authenticated") {
        if (existingItem) {
          updateCartItemMutation.mutate({
            productId: existingItem.product.id,
            quantity: Math.max(
              1,
              existingItem.quantity + addedProduct.quantity
            ),
          });
        } else {
          addToCartMutation.mutate(addedProduct);
        }
      } else {
        if (existingItem) {
          updateCartItemInCookie({
            ...existingItem,
            quantity: Math.max(
              1,
              existingItem.quantity + addedProduct.quantity
            ),
          });
        } else {
          addItemToCookie(addedProduct);
        }
        queryClient.invalidateQueries({ queryKey: ["cart"] });
      }
      dispatch(clearAddedProduct());
    }
  }, [
    addedProduct,
    cartItems,
    status,
    queryClient,
    dispatch,
    addToCartMutation,
    updateCartItemMutation,
  ]);

  const handleQunatityChange = (itemId: string, newQuantity: number) => {
    const item = cartItems.find((item) => item.id === itemId);

    if (!item) return;

    if (status === "authenticated") {
      updateCartItemMutation.mutate({
        productId: item.product.id,
        quantity: Math.max(1, newQuantity),
      });
    } else {
      const updatedItem = { ...item, quantity: Math.max(1, newQuantity) };
      updateCartItemInCookie(updatedItem);
      queryClient.setQueryData(
        ["cart"],
        cartItems.map((i) => (i.id === itemId ? updatedItem : i))
      );
    }
  };

  const handleRemoveItem = (itemId: string) => {
    const item = cartItems.find((item) => item.id === itemId);
    if (!item) return;

    if (status === "authenticated") {
      removeFromCartMutation.mutate(item.product.id);
    } else {
      removeCartItemFromCookie(item.product.id);
      queryClient.setQueryData(
        ["cart"],
        cartItems.filter((i) => i.id !== itemId)
      );
    }
  };

  const handleClearCart = () => {
    if (status === "authenticated") {
      cartItems.forEach(
        (item) => removeFromCartMutation.mutate(item.product.id) //TODO: create deleteCart on strapi
      );
    } else {
      clearCartFromCookie();
      queryClient.setQueryData(["cart"], []);
    }
  };

  const handleConfirm = () => {
    if (status === "unauthenticated") {
      dispatch(openSignInModal("/checkout"));
    } else if (status === "authenticated") {
      router.push("/checkout");
    }
    dispatch(closeModal());
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const modalRef = useOutsideClick(handleCloseModal);

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div
            ref={modalRef}
            className="bg-white p-6 rounded-lg shadow-md max-w-xl w-full mx-auto flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">ВАШ КОШИК</h2>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleClearCart()}
                    className="text-red-800 hover:text-red-700"
                  >
                    Видалити всі
                  </button>
                  <button
                    onClick={() => handleCloseModal()}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <span className="text-2xl">
                      <X size={24} />
                    </span>
                  </button>
                </div>
              </div>
            </div>
            {/* Scrollable items container */}
            <div className="overflow-y-auto flex-grow">
              <div className="p-4">
                {isLoading ? (
                  <div>Loading cart...</div>
                ) : cartItems.length === 0 ? (
                  <div className="p-4 text-center text-xl">Кошик порожній</div>
                ) : (
                  cartItems.map((item, index) => (
                    <div
                      key={item.id}
                      className="flex items-center mb-4 border-b pb-2"
                    >
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-800 hover:text-red-700 mr-2 flex-shrink-0"
                      >
                        <Trash2 size={20} />
                      </button>

                      <div className="flex-shrink-0 mr-4">
                        <Image
                          src={item.product.image_link}
                          alt={item.product.title}
                          width={100}
                          height={100}
                          className="object-cover"
                        />
                      </div>

                      <div className="flex flex-col flex-grow">
                        <p className="font-semibold mb-2">
                          {item.product.title}
                        </p>

                        <div className="flex items-center justify-around">
                          <div className="flex-1">
                            <span>{item.product.retail.toFixed(2)} грн</span>
                          </div>

                          <div className="flex items-center justify-center flex-1">
                            <button
                              onClick={() =>
                                handleQunatityChange(item.id, item.quantity - 1)
                              }
                              className="px-3 py-1 border rounded"
                            >
                              -
                            </button>
                            <span className="mx-2">{item.quantity}</span>
                            <button
                              onClick={() =>
                                handleQunatityChange(item.id, item.quantity + 1)
                              }
                              className="px-3 py-1 border rounded"
                            >
                              +
                            </button>
                          </div>

                          <div>
                            {item.product.discount > 0 ? (
                              <>
                                <p className="line-through decoration-red-800 mr-2 my-0">
                                  {(
                                    item.product.retail * item.quantity
                                  ).toFixed(2)}{" "}
                                  грн
                                </p>
                                <p className="font-bold text-red-800 my-0">
                                  {(
                                    (item.product.retail -
                                      (item.product.retail *
                                        item.product.discount) /
                                        100) *
                                    item.quantity
                                  ).toFixed(2)}{" "}
                                  грн
                                </p>
                              </>
                            ) : (
                              <p className="font-bold">
                                {(item.product.retail * item.quantity).toFixed(
                                  2
                                )}{" "}
                                грн
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t">
              <div className="flex flex-col md:flex-row justify-between">
                <div>
                  <button
                    onClick={() => handleCloseModal()}
                    className="flex items-center bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-100"
                  >
                    <ArrowLeft size={24} />
                    Продовжити покупку
                  </button>
                </div>

                <div>
                  <p className="flex justify-between">
                    <span>Знижка:</span>{" "}
                    <span className="font-bold text-md">
                      {calculateDiscountTotal.toFixed(2)} грн
                    </span>
                  </p>
                  <div className="flex justify-between items-start text-lg mt-1 mb-4">
                    <p>Разом:</p>
                    <div className="flex flex-col text-right">
                      <span className="text-gray-400 text-sm line-through">
                        {calculateTotal.toFixed(2)} грн
                      </span>
                      <span className="font-bold">
                        {(calculateTotal - calculateDiscountTotal).toFixed(2)}{" "}
                        грн
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleConfirm()}
                    className="bg-green-500 text-white py-3 px-6 rounded hover:bg-green-600 transition duration-300"
                  >
                    Оформити замовлення
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShoppingCartModal;
