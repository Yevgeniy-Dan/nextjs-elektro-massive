import {
  addItemToCookie,
  clearCartFromCookie,
  getCartItemsFromCookie,
  removeCartItemFromCookie,
  updateCartItemInCookie,
} from "@/app/utils/cartHeplers";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { openSignInModal } from "@/store/signInModalSlice";
import { clearAddedProduct, closeModal } from "@/store/storeSlice";
import {
  IAddToCartResponse,
  ICartItem,
  IGetUserCartResponse,
  IRemoveFromCartResponse,
  IUpdateCartItemResponse,
} from "@/types/cart";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

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

export const useCart = () => {
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

  const handleAddToCart = (item: ICartItem) => {
    if (status === "authenticated") {
      addToCartMutation.mutate(item);
    } else {
      const addedItem = { ...item, quantity: 1 };
      addItemToCookie(addedItem);
      queryClient.setQueryData(["cart"], cartItems.concat(addedItem));
    }
  };

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
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

  return {
    isModalOpen,
    cartItems,
    isLoading,
    handleQuantityChange,
    handleAddToCart,
    handleRemoveItem,
    handleClearCart,
    handleConfirm,
    handleCloseModal,
    calculateTotal,
    calculateDiscountTotal,
  };
};
