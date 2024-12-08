"use client";

import React from "react";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { useTranslation } from "@/app/i18n/client";

interface BlogBreadcrumbsProps {
  lng: string;
}

interface BlogArticleBreadcrumbs extends BlogBreadcrumbsProps {
  slug: string;
  articleName: string;
}

const BlogBreadcrumbs: React.FC<BlogBreadcrumbsProps> = ({ lng }) => {
  const { t } = useTranslation(lng, "blog");

  const customLabels = {
    blog: t("breadcrumb"),
  };

  return <Breadcrumbs customLabels={customLabels} />;
};

export const BlogArticleBreadcrumbs: React.FC<BlogArticleBreadcrumbs> = ({
  slug,
  articleName,
  lng,
}) => {
  const { t } = useTranslation(lng, "blog");

  const customLabels = {
    blog: t("breadcrumb"),
    [slug]: articleName,
  };

  return <Breadcrumbs customLabels={customLabels} />;
};

export default BlogBreadcrumbs;
