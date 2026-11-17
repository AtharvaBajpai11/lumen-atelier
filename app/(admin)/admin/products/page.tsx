'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { getProducts, getCategories, createProductRecord, updateProductRecord, deleteProductRecord } from '@/lib/store';
import { Product, Category } from '@/types';
import { formatCurrency, slugify } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/context/ToastContext';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Check,
  X,
  Upload,
  Tag,
  AlertTriangle,
  Layers,
  ChevronLeft,
  ChevronRight,
  Car,
} from 'lucide-react';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteCandidate, setDeleteCandidate] = useState<Product | null>(null);

  const { addToast } = useToast();

  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formBrand, setFormBrand] = useState('');
  const [formSubcategory, setFormSubcategory] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formPrice, setFormPrice] = useState('');
  const [formSalePrice, setFormSalePrice] = useState('');
  const [formSku, setFormSku] = useState('');
  const [formStock, setFormStock] = useState('20');
  const [formCategoryId, setFormCategoryId] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formStatus, setFormStatus] = useState<'active' | 'draft'>('active');
  const [formIsVehicle, setFormIsVehicle] = useState(false);

  useEffect(() => {
    async function load() {
      const [prods, cats] = await Promise.all([getProducts(), getCategories()]);
      setProducts(prods);
      setCategories(cats);
    }
    load();
  }, []);

  const openCreateModal = () => {
    setEditingProduct(null);
    setFormTitle('');
    setFormBrand('Lumen Atelier');
    setFormSubcategory('Smartphones');
    setFormSlug('');
    setFormDesc('');
    setFormPrice('');
    setFormSalePrice('');
    setFormSku(`LMN-${Date.now().toString().slice(-4)}`);
    setFormStock('25');
    setFormCategoryId(categories[0]?.id || '');
    setFormImageUrl('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80');
    setFormStatus('active');
    setFormIsVehicle(false);
    setIsModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setFormTitle(p.title);
    setFormBrand(p.brand || 'Lumen Atelier');
    setFormSubcategory(p.subcategory || 'General');
    setFormSlug(p.slug);
    setFormDesc(p.description.replace(/<[^>]*>?/gm, ''));
    setFormPrice(p.price.toString());
    setFormSalePrice(p.sale_price ? p.sale_price.toString() : '');
    setFormSku(p.sku);
    setFormStock(p.stock_quantity.toString());
    setFormCategoryId(p.category_id || categories[0]?.id || '');
    setFormImageUrl(p.images?.[0]?.image_url || '');
    setFormStatus(p.status);
    setFormIsVehicle(Boolean(p.is_vehicle));
    setIsModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setFormTitle(val);
    if (!editingProduct) {
      setFormSlug(slugify(val));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formPrice) {
      addToast('Title and regular price are mandatory', 'error');
      return;
    }

    const matchedCat = categories.find((c) => c.id === formCategoryId) || categories[0];

    if (editingProduct) {
      // Update via store layer
      const updated = await updateProductRecord(editingProduct.id, {
        title: formTitle,
        brand: formBrand,
        subcategory: formSubcategory,
        slug: formSlug || slugify(formTitle),
        description: `<p>${formDesc}</p>`,
        price: Number(formPrice),
        sale_price: formSalePrice ? Number(formSalePrice) : null,
        sku: formSku,
        stock_quantity: Number(formStock),
        category_id: formCategoryId,
        status: formStatus,
        is_vehicle: formIsVehicle,
        images: [
          {
            id: 'img1',
            product_id: editingProduct.id,
            image_url: formImageUrl,
            sort_order: 1,
          },
        ],
      });

      if (updated) {
        setProducts(products.map((p) => (p.id === updated.id ? updated : p)));
        addToast(`Updated object "${formTitle}"`, 'success');
      }
    } else {
      // Create via store layer
      const created = await createProductRecord({
        title: formTitle,
        brand: formBrand,
        subcategory: formSubcategory,
        slug: formSlug || slugify(formTitle),
        description: `<p>${formDesc}</p>`,
        category_id: formCategoryId,
        price: Number(formPrice),
        sale_price: formSalePrice ? Number(formSalePrice) : null,
        sku: formSku,
        stock_quantity: Number(formStock),
        status: formStatus,
        is_vehicle: formIsVehicle,
        images: [
          {
            id: `img_${Date.now()}`,
            product_id: `p_${Date.now()}`,
            image_url: formImageUrl,
            sort_order: 1,
          },
        ],
      });

      setProducts([created, ...products]);
      addToast(`Archived new design object "${formTitle}"`, 'success');
    }

    setIsModalOpen(false);
  };

  const confirmDelete = async () => {
    if (!deleteCandidate) return;
    await deleteProductRecord(deleteCandidate.id);
    setProducts(products.filter((p) => p.id !== deleteCandidate.id));
    addToast(`Deleted "${deleteCandidate.title}"`, 'info');
    setDeleteCandidate(null);
  };

  const filteredProducts = products.filter((p) => {
    const q = search.toLowerCase();
    const matchesSearch =
      p.title.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      (p.brand && p.brand.toLowerCase().includes(q)) ||
      (p.subcategory && p.subcategory.toLowerCase().includes(q));
    const matchesCat = selectedCategory ? p.category?.slug === selectedCategory : true;
    return matchesSearch && matchesCat;
  });

  const totalPages = Math.ceil(filteredProducts.length / pageSize) || 1;
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/10">
        <div>
          <h1 className="font-serif text-3xl font-normal text-primary-text">
            Product Archive Management
          </h1>
          <p className="text-xs text-secondary-text mt-1">
            Curate objects, control inventory levels, variant models, and live status.
          </p>
        </div>
        <Button onClick={openCreateModal} size="md">
          <Plus className="w-4 h-4 mr-1" />
          <span>Add New Object</span>
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white border border-black/[0.08] shadow-subtle">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, SKU, tags..."
            className="w-full h-10 pl-9 pr-4 bg-transparent border border-black/10 text-xs focus:outline-none focus:border-black"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="h-10 px-3 bg-white border border-black/10 text-xs uppercase tracking-wider text-primary-text focus:outline-none focus:border-black"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
          <span className="text-xs text-secondary-text">
            {filteredProducts.length} Objects
          </span>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white border border-black/[0.08] shadow-subtle overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-black/10 text-secondary-text uppercase tracking-wider font-semibold bg-[#FAFAFA]">
              <th className="py-3 px-4">Thumbnail</th>
              <th className="py-3 px-4">Title & Brand</th>
              <th className="py-3 px-4">SKU</th>
              <th className="py-3 px-4">Category & Sub</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Stock</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {paginatedProducts.map((p) => (
              <tr key={p.id} className="hover:bg-neutral-50 transition-colors">
                <td className="py-3 px-4">
                  <div className="relative w-12 h-14 bg-[#F5F5F0] border border-black/5 overflow-hidden">
                    <Image
                      src={
                        p.images?.[0]?.image_url ||
                        'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=400&q=80'
                      }
                      alt={p.title}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                </td>
                <td className="py-3 px-4 max-w-xs">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    {p.brand && (
                      <span className="text-[10px] uppercase font-bold tracking-wider text-black bg-neutral-100 px-1.5 py-0.2">
                        {p.brand}
                      </span>
                    )}
                    {p.is_vehicle && (
                      <span className="text-[10px] text-accent font-semibold flex items-center gap-0.5">
                        <Car className="w-3 h-3" /> Vehicle
                      </span>
                    )}
                  </div>
                  <p className="font-serif text-sm font-normal text-primary-text truncate">
                    {p.title}
                  </p>
                  <p className="text-[10px] text-secondary-text font-mono truncate">
                    /{p.slug}
                  </p>
                </td>
                <td className="py-3 px-4 font-mono font-bold text-neutral-700">{p.sku}</td>
                <td className="py-3 px-4 text-secondary-text">
                  <div className="font-medium text-primary-text">{p.category?.name || 'General'}</div>
                  {p.subcategory && (
                    <div className="text-[10px] text-neutral-500">{p.subcategory}</div>
                  )}
                </td>
                <td className="py-3 px-4 font-semibold text-primary-text">
                  {p.sale_price ? (
                    <div>
                      <span className="text-sale">{formatCurrency(p.sale_price)}</span>{' '}
                      <span className="text-[10px] text-secondary-text line-through">
                        {formatCurrency(p.price)}
                      </span>
                    </div>
                  ) : (
                    formatCurrency(p.price)
                  )}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`font-semibold ${
                      p.stock_quantity < 10 ? 'text-amber-700' : 'text-neutral-800'
                    }`}
                  >
                    {p.stock_quantity}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider ${
                      p.status === 'active'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-neutral-100 text-neutral-600 border border-neutral-300'
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right space-x-2">
                  <button
                    onClick={() => openEditModal(p)}
                    className="p-1 text-secondary-text hover:text-black transition-colors"
                    title="Edit object"
                  >
                    <Edit className="w-4 h-4 inline" />
                  </button>
                  <button
                    onClick={() => setDeleteCandidate(p)}
                    className="p-1 text-neutral-400 hover:text-sale transition-colors"
                    title="Delete object"
                  >
                    <Trash2 className="w-4 h-4 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Bar */}
        <div className="p-4 border-t border-black/10 bg-[#FAFAFA] flex items-center justify-between text-xs text-secondary-text">
          <div>
            Showing {Math.min((currentPage - 1) * pageSize + 1, filteredProducts.length)} to{' '}
            {Math.min(currentPage * pageSize, filteredProducts.length)} of {filteredProducts.length}{' '}
            Products
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-1.5 border border-black/10 bg-white hover:bg-neutral-100 disabled:opacity-40 transition-colors"
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-4 h-4 text-black" />
            </button>
            <span className="font-semibold px-2 text-primary-text">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 border border-black/10 bg-white hover:bg-neutral-100 disabled:opacity-40 transition-colors"
              aria-label="Next Page"
            >
              <ChevronRight className="w-4 h-4 text-black" />
            </button>
          </div>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProduct ? 'Edit Archival Object' : 'Create New Object'}
        maxWidth="2xl"
      >
        <form onSubmit={handleSave} className="space-y-4 max-h-[75vh] overflow-y-auto pr-2">
          <Input
            label="Product Title *"
            value={formTitle}
            onChange={(e) => handleTitleChange(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Brand / Atelier"
              value={formBrand}
              onChange={(e) => setFormBrand(e.target.value)}
              placeholder="e.g. Apple, Sony, Porsche, Aesop"
            />
            <Input
              label="Subcategory"
              value={formSubcategory}
              onChange={(e) => setFormSubcategory(e.target.value)}
              placeholder="e.g. Smartphones, Electric Cars"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="URL Slug"
              value={formSlug}
              onChange={(e) => setFormSlug(e.target.value)}
              required
            />
            <Input
              label="SKU Identifier"
              value={formSku}
              onChange={(e) => setFormSku(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-secondary-text mb-1">
              Curatorial Description
            </label>
            <textarea
              rows={3}
              value={formDesc}
              onChange={(e) => setFormDesc(e.target.value)}
              className="w-full p-3 bg-white border border-black/15 text-xs text-primary-text focus:outline-none focus:border-black rounded-none"
              placeholder="Detailed physical dimensions, geological traits, and care advice..."
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Input
              label="Regular Price (₹)"
              type="number"
              value={formPrice}
              onChange={(e) => setFormPrice(e.target.value)}
              required
            />
            <Input
              label="Sale Price (₹ Optional)"
              type="number"
              value={formSalePrice}
              onChange={(e) => setFormSalePrice(e.target.value)}
            />
            <Input
              label="Initial Stock Quantity"
              type="number"
              value={formStock}
              onChange={(e) => setFormStock(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-secondary-text mb-1">
                Category
              </label>
              <select
                value={formCategoryId}
                onChange={(e) => setFormCategoryId(e.target.value)}
                className="w-full h-14 px-3 bg-white border border-black/15 text-xs uppercase tracking-wider text-primary-text focus:outline-none focus:border-black"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-secondary-text mb-1">
                Publication Status
              </label>
              <select
                value={formStatus}
                onChange={(e) => setFormStatus(e.target.value as any)}
                className="w-full h-14 px-3 bg-white border border-black/15 text-xs uppercase tracking-wider text-primary-text focus:outline-none focus:border-black"
              >
                <option value="active">Active (Visible in Storefront)</option>
                <option value="draft">Draft (Private Archival Record)</option>
              </select>
            </div>
          </div>

          {/* Vehicle Toggle */}
          <div className="p-3 bg-neutral-50 border border-black/10 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-primary-text block">Vehicle / Automotive Item</span>
              <span className="text-[10px] text-secondary-text">Enable vehicle enquiry & test-drive workflow instead of direct checkout</span>
            </div>
            <input
              type="checkbox"
              checked={formIsVehicle}
              onChange={(e) => setFormIsVehicle(e.target.checked)}
              className="accent-black w-4 h-4 cursor-pointer"
            />
          </div>

          <Input
            label="Featured Image URL"
            value={formImageUrl}
            onChange={(e) => setFormImageUrl(e.target.value)}
            placeholder="https://images.unsplash.com/..."
            required
          />

          <div className="pt-4 flex justify-end gap-3 border-t border-black/10">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              <span>{editingProduct ? 'Save Updates' : 'Publish Object'}</span>
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteCandidate}
        onClose={() => setDeleteCandidate(null)}
        title="Confirm Archival Deletion"
        maxWidth="md"
      >
        <div className="space-y-4">
          <p className="text-xs text-secondary-text leading-relaxed">
            Are you certain you wish to permanently remove &ldquo;{deleteCandidate?.title}&rdquo; from the catalog? This will eradicate historical variants and image links.
          </p>
          <div className="pt-4 flex justify-end gap-3 border-t border-black/10">
            <Button variant="outline" onClick={() => setDeleteCandidate(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Confirm Permanent Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
