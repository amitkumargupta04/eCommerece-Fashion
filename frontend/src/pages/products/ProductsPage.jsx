import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { productService, categoryService, subCategoryService } from "@/services";
import ProductCard from "@/global/ProductCard";
import {
  Filter,
  X,
  ChevronDown,
  SlidersHorizontal,
  Search,
  Sparkles,
  RotateCcw,
  PackageX,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL Query Params
  const categoryIdParam = searchParams.get("categoryId") || "";
  const subCategoryIdParam = searchParams.get("subCategoryId") || "";
  const keywordParam = searchParams.get("keyword") || "";
  const isTrendingParam = searchParams.get("isTrending") === "true";
  const isNewArrivalParam = searchParams.get("isNewArrival") === "true";
  const isBestSellerParam = searchParams.get("isBestSeller") === "true";
  const sortByParam = searchParams.get("sortBy") || "createdAt";
  const sortDirectionParam = searchParams.get("sortDirection") || "desc";
  const pageParam = parseInt(searchParams.get("page") || "0", 10);

  // Component States
  const [products, setProducts] = useState([]);
  const [metaData, setMetaData] = useState({
    currentPage: 0,
    pageSize: 12,
    totalElements: 0,
    totalPages: 1,
    hasNext: false,
    hasPrevious: false,
  });
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(keywordParam);

  // Sync search input if URL changes
  useEffect(() => {
    setSearchInput(keywordParam);
  }, [keywordParam]);

  // Load Categories & SubCategories
  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const [catRes, subRes] = await Promise.all([
          categoryService.getAllCategories(),
          subCategoryService.getSubCategories(),
        ]);
        const cats = Array.isArray(catRes?.data)
          ? catRes.data
          : Array.isArray(catRes)
          ? catRes
          : [];
        const subs = Array.isArray(subRes?.data)
          ? subRes.data
          : Array.isArray(subRes)
          ? subRes
          : [];
        setCategories(cats.filter((c) => c.active !== false));
        setSubCategories(subs.filter((s) => s.active !== false));
      } catch (err) {
        console.error("Failed to load category/subcategory filters:", err);
      }
    };
    fetchMetadata();
  }, []);

  // Fetch Products based on URL params
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = {
          page: pageParam,
          size: 12,
        };

        if (keywordParam) params.keyword = keywordParam;
        if (categoryIdParam) params.categoryId = Number(categoryIdParam);
        if (subCategoryIdParam) params.subCategoryId = Number(subCategoryIdParam);
        if (isTrendingParam) params.isTrending = true;
        if (isNewArrivalParam) params.isNewArrival = true;
        if (isBestSellerParam) params.isBestSeller = true;
        if (sortByParam) params.sortBy = sortByParam;
        if (sortDirectionParam) params.sortDirection = sortDirectionParam;

        const res = await productService.getProducts(params);
        const list = Array.isArray(res?.data)
          ? res.data
          : Array.isArray(res)
          ? res
          : [];

        setProducts(list);
        if (res?.metaData) {
          setMetaData(res.metaData);
        } else {
          setMetaData({
            currentPage: pageParam,
            pageSize: 12,
            totalElements: list.length,
            totalPages: Math.ceil(list.length / 12) || 1,
            hasNext: false,
            hasPrevious: pageParam > 0,
          });
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [
    categoryIdParam,
    subCategoryIdParam,
    keywordParam,
    isTrendingParam,
    isNewArrivalParam,
    isBestSellerParam,
    sortByParam,
    sortDirectionParam,
    pageParam,
  ]);

  // Update URL Search Params helper
  const updateParams = (newParams) => {
    const current = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, val]) => {
      if (val === null || val === undefined || val === "" || val === false) {
        current.delete(key);
      } else {
        current.set(key, String(val));
      }
    });
    // Reset page on filter changes unless page was explicitly updated
    if (!("page" in newParams)) {
      current.delete("page");
    }
    setSearchParams(current);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateParams({ keyword: searchInput.trim() });
  };

  const clearAllFilters = () => {
    setSearchParams(new URLSearchParams());
    setSearchInput("");
  };

  const activeCategory = categories.find(
    (c) => String(c.id) === String(categoryIdParam)
  );

  const matchingSubCategories = useMemo(() => {
    if (!categoryIdParam) return subCategories;
    return subCategories.filter(
      (s) => Number(s.categoryId) === Number(categoryIdParam)
    );
  }, [subCategories, categoryIdParam]);

  const activeFiltersCount = [
    categoryIdParam,
    subCategoryIdParam,
    keywordParam,
    isTrendingParam,
    isNewArrivalParam,
    isBestSellerParam,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-black text-white py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header & Breadcrumb */}
      <div className="border-b border-white/10 pb-6 mb-8">
        <div className="flex items-center gap-2 text-xs text-neutral-400 uppercase tracking-widest mb-2">
          <Link to="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-white font-semibold">
            {activeCategory ? activeCategory.name : "All Products"}
          </span>
          {subCategoryIdParam && (
            <>
              <span>/</span>
              <span className="text-neutral-300">
                {subCategories.find((s) => String(s.id) === String(subCategoryIdParam))
                  ?.name || "Sub-Category"}
              </span>
            </>
          )}
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
              {activeCategory ? activeCategory.name : "Curated Collection"}
            </h1>
            <p className="text-sm text-neutral-400 mt-1">
              Showing {metaData.totalElements || products.length} refined luxury styles
            </p>
          </div>

          {/* Controls Bar: Search & Sort */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Filter collection..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full px-3.5 py-2 pl-3 pr-8 bg-neutral-950 border border-white/20 rounded-xl text-white text-xs sm:text-sm placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
              />
              <button
                type="submit"
                aria-label="Search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white cursor-pointer"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* Sort Selector */}
            <select
              value={`${sortByParam}_${sortDirectionParam}`}
              onChange={(e) => {
                const [sortBy, sortDirection] = e.target.value.split("_");
                updateParams({ sortBy, sortDirection });
              }}
              className="px-3.5 py-2 bg-neutral-950 border border-white/20 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-white transition-colors cursor-pointer"
            >
              <option value="createdAt_desc" className="bg-black text-white">
                Newest First
              </option>
              <option value="price_asc" className="bg-black text-white">
                Price: Low to High
              </option>
              <option value="price_desc" className="bg-black text-white">
                Price: High to Low
              </option>
              <option value="name_asc" className="bg-black text-white">
                Name: A to Z
              </option>
            </select>

            {/* Mobile Filter Toggle Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="md:hidden inline-flex items-center gap-2 px-3.5 py-2 bg-white text-black text-xs font-bold rounded-xl hover:bg-neutral-200 transition cursor-pointer"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
            </button>
          </div>
        </div>

        {/* Quick Filter Tag Pills */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-white/10">
          <button
            onClick={() =>
              updateParams({
                categoryId: "",
                subCategoryId: "",
                isTrending: "",
                isNewArrival: "",
                isBestSeller: "",
              })
            }
            className={`px-3 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition cursor-pointer ${
              !categoryIdParam &&
              !subCategoryIdParam &&
              !isTrendingParam &&
              !isNewArrivalParam &&
              !isBestSellerParam
                ? "bg-white text-black font-bold"
                : "bg-neutral-950 border border-white/20 text-neutral-300 hover:border-white hover:text-white"
            }`}
          >
            All Items
          </button>

          <button
            onClick={() => updateParams({ isTrending: !isTrendingParam })}
            className={`px-3 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition cursor-pointer ${
              isTrendingParam
                ? "bg-white text-black font-bold"
                : "bg-neutral-950 border border-white/20 text-neutral-300 hover:border-white hover:text-white"
            }`}
          >
            🔥 Trending
          </button>

          <button
            onClick={() => updateParams({ isNewArrival: !isNewArrivalParam })}
            className={`px-3 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition cursor-pointer ${
              isNewArrivalParam
                ? "bg-white text-black font-bold"
                : "bg-neutral-950 border border-white/20 text-neutral-300 hover:border-white hover:text-white"
            }`}
          >
            ✨ New Arrivals
          </button>

          <button
            onClick={() => updateParams({ isBestSeller: !isBestSellerParam })}
            className={`px-3 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition cursor-pointer ${
              isBestSellerParam
                ? "bg-white text-black font-bold"
                : "bg-neutral-950 border border-white/20 text-neutral-300 hover:border-white hover:text-white"
            }`}
          >
            ⭐ Best Sellers
          </button>

          {activeFiltersCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer ml-auto"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Content Layout (Sidebar + Product Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden md:block space-y-6">
          {/* Categories Filter Section */}
          <div className="bg-neutral-950 border border-white/15 rounded-2xl p-5">
            <h3 className="text-xs uppercase font-bold tracking-widest text-neutral-400 mb-4 pb-2 border-b border-white/10">
              Categories
            </h3>
            <div className="space-y-1.5">
              <button
                onClick={() => updateParams({ categoryId: "", subCategoryId: "" })}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer flex items-center justify-between ${
                  !categoryIdParam
                    ? "bg-white text-black font-bold"
                    : "text-neutral-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span>All Categories</span>
                {!categoryIdParam && <Sparkles className="w-3.5 h-3.5" />}
              </button>

              {categories.map((cat) => {
                const isSelected = String(cat.id) === String(categoryIdParam);
                return (
                  <button
                    key={cat.id}
                    onClick={() =>
                      updateParams({
                        categoryId: isSelected ? "" : cat.id,
                        subCategoryId: "",
                      })
                    }
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? "bg-white text-black font-bold"
                        : "text-neutral-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span>{cat.name}</span>
                    {isSelected && <Sparkles className="w-3.5 h-3.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* SubCategories Filter Section */}
          {matchingSubCategories.length > 0 && (
            <div className="bg-neutral-950 border border-white/15 rounded-2xl p-5">
              <h3 className="text-xs uppercase font-bold tracking-widest text-neutral-400 mb-4 pb-2 border-b border-white/10">
                Sub-Categories
              </h3>
              <div className="space-y-1.5">
                <button
                  onClick={() => updateParams({ subCategoryId: "" })}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer ${
                    !subCategoryIdParam
                      ? "bg-white text-black font-bold"
                      : "text-neutral-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  All Sub-Categories
                </button>

                {matchingSubCategories.map((sub) => {
                  const isSelected = String(sub.id) === String(subCategoryIdParam);
                  return (
                    <button
                      key={sub.id}
                      onClick={() =>
                        updateParams({
                          subCategoryId: isSelected ? "" : sub.id,
                        })
                      }
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? "bg-white text-black font-bold"
                          : "text-neutral-300 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <span>{sub.name}</span>
                      {isSelected && <Sparkles className="w-3.5 h-3.5" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </aside>

        {/* Product Grid Area */}
        <main className="md:col-span-3">
          {loading ? (
            /* Loading Skeletons */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  className="aspect-[3/4] bg-neutral-900 border border-white/10 rounded-2xl animate-pulse"
                />
              ))}
            </div>
          ) : products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id || product._id} product={product} />
                ))}
              </div>

              {/* Pagination Bar */}
              {metaData.totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 mt-12 pt-8 border-t border-white/10">
                  <button
                    onClick={() => updateParams({ page: Math.max(0, pageParam - 1) })}
                    disabled={pageParam === 0}
                    className="p-2.5 rounded-xl bg-neutral-950 border border-white/20 text-white hover:bg-white hover:text-black transition disabled:opacity-20 disabled:pointer-events-none cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <span className="text-xs sm:text-sm text-neutral-400 font-medium px-2">
                    Page <span className="text-white font-bold">{pageParam + 1}</span> of{" "}
                    <span className="text-white font-bold">{metaData.totalPages}</span>
                  </span>

                  <button
                    onClick={() =>
                      updateParams({
                        page: Math.min(metaData.totalPages - 1, pageParam + 1),
                      })
                    }
                    disabled={pageParam >= metaData.totalPages - 1}
                    className="p-2.5 rounded-xl bg-neutral-950 border border-white/20 text-white hover:bg-white hover:text-black transition disabled:opacity-20 disabled:pointer-events-none cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center text-center py-20 px-4 bg-neutral-950 border border-white/15 rounded-3xl">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/20 flex items-center justify-center mb-4 text-neutral-400">
                <PackageX className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-wide text-white mb-2">
                No Products Found
              </h3>
              <p className="text-sm text-neutral-400 max-w-sm mb-6 leading-relaxed">
                We couldn't find any luxury pieces matching your active filters. Try clearing
                or adjusting your criteria.
              </p>
              <button
                onClick={clearAllFilters}
                className="px-6 py-2.5 bg-white text-black font-semibold text-xs uppercase tracking-wider rounded-xl hover:bg-neutral-200 transition cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filters Slide-over Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex justify-end">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />

          <div className="relative w-4/5 max-w-sm bg-neutral-950 border-l border-white/20 h-full overflow-y-auto p-6 flex flex-col justify-between z-50">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <span className="text-lg font-bold uppercase tracking-wider">
                  Filters
                </span>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 text-neutral-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Category List */}
              <div className="mb-6">
                <h4 className="text-xs uppercase font-bold tracking-widest text-neutral-400 mb-3">
                  Categories
                </h4>
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      updateParams({ categoryId: "", subCategoryId: "" });
                      setMobileFilterOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium ${
                      !categoryIdParam
                        ? "bg-white text-black font-bold"
                        : "text-neutral-300"
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        updateParams({
                          categoryId:
                            String(cat.id) === String(categoryIdParam) ? "" : cat.id,
                          subCategoryId: "",
                        });
                        setMobileFilterOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium ${
                        String(cat.id) === String(categoryIdParam)
                          ? "bg-white text-black font-bold"
                          : "text-neutral-300"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile SubCategory List */}
              {matchingSubCategories.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-xs uppercase font-bold tracking-widest text-neutral-400 mb-3">
                    Sub-Categories
                  </h4>
                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        updateParams({ subCategoryId: "" });
                        setMobileFilterOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium ${
                        !subCategoryIdParam
                          ? "bg-white text-black font-bold"
                          : "text-neutral-300"
                      }`}
                    >
                      All Sub-Categories
                    </button>
                    {matchingSubCategories.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => {
                          updateParams({
                            subCategoryId:
                              String(sub.id) === String(subCategoryIdParam)
                                ? ""
                                : sub.id,
                          });
                          setMobileFilterOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium ${
                          String(sub.id) === String(subCategoryIdParam)
                            ? "bg-white text-black font-bold"
                            : "text-neutral-300"
                        }`}
                      >
                        {sub.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-white/10">
              <button
                onClick={() => {
                  clearAllFilters();
                  setMobileFilterOpen(false);
                }}
                className="w-full py-2.5 border border-white/30 text-white rounded-xl text-xs uppercase font-bold hover:bg-white/10 transition"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
