'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { getCategories } from '@/lib/store';
import { Category } from '@/types';
import { slugify } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/context/ToastContext';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deleteCandidate, setDeleteCandidate] = useState<Category | null>(null);

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [desc, setDesc] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const { addToast } = useToast();

  useEffect(() => {
    async function fetchCats() {
      const all = await getCategories();
      setCategories(all);
    }
    fetchCats();
  }, []);

  const openCreateModal = () => {
    setEditingCategory(null);
    setName('');
    setSlug('');
    setDesc('');
    setImageUrl('https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=800&q=80');
    setIsModalOpen(true);
  };

  const openEditModal = (c: Category) => {
    setEditingCategory(c);
    setName(c.name);
    setSlug(c.slug);
    setDesc(c.description || '');
    setImageUrl(c.image_url || '');
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    if (editingCategory) {
      setCategories(
        categories.map((c) =>
          c.id === editingCategory.id
            ? { ...c, name, slug: slug || slugify(name), description: desc, image_url: imageUrl }
            : c
        )
      );
      addToast(`Updated category "${name}"`, 'success');
    } else {
      const newCat: Category = {
        id: `c_${Date.now()}`,
        name,
        slug: slug || slugify(name),
        description: desc,
        image_url: imageUrl,
        sort_order: categories.length + 1,
        created_at: new Date().toISOString(),
      };
      setCategories([...categories, newCat]);
      addToast(`Created category "${name}"`, 'success');
    }
    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    if (!deleteCandidate) return;
    setCategories(categories.filter((c) => c.id !== deleteCandidate.id));
    addToast(`Deleted category "${deleteCandidate.name}"`, 'info');
    setDeleteCandidate(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/10">
        <div>
          <h1 className="font-serif text-3xl font-normal text-primary-text">
            Category & Medium Architecture
          </h1>
          <p className="text-xs text-secondary-text mt-1">
            Organize catalog groupings, landing banners, and navigational taxonomies.
          </p>
        </div>
        <Button onClick={openCreateModal} size="md">
          <Plus className="w-4 h-4 mr-1" />
          <span>Create Category</span>
        </Button>
      </div>

      <div className="bg-white border border-black/[0.08] shadow-subtle overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-black/10 text-secondary-text uppercase tracking-wider font-semibold bg-[#FAFAFA]">
              <th className="py-3 px-4">Banner</th>
              <th className="py-3 px-4">Category Name</th>
              <th className="py-3 px-4">URL Slug</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {categories.map((c) => (
              <tr key={c.id} className="hover:bg-neutral-50 transition-colors">
                <td className="py-3 px-4">
                  <div className="relative w-16 h-12 bg-neutral-100 overflow-hidden border border-black/5">
                    {c.image_url && (
                      <Image src={c.image_url} alt={c.name} fill sizes="64px" className="object-cover" />
                    )}
                  </div>
                </td>
                <td className="py-3 px-4 font-serif text-base font-normal text-primary-text">
                  {c.name}
                </td>
                <td className="py-3 px-4 font-mono text-secondary-text">/{c.slug}</td>
                <td className="py-3 px-4 text-secondary-text max-w-sm truncate">
                  {c.description}
                </td>
                <td className="py-3 px-4 text-right space-x-2">
                  <button onClick={() => openEditModal(c)} className="p-1 text-secondary-text hover:text-black">
                    <Edit className="w-4 h-4 inline" />
                  </button>
                  <button onClick={() => setDeleteCandidate(c)} className="p-1 text-neutral-400 hover:text-sale">
                    <Trash2 className="w-4 h-4 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCategory ? 'Edit Category' : 'Create Category'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="Category Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (!editingCategory) setSlug(slugify(e.target.value));
            }}
            required
          />
          <Input label="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} required />
          <Input label="Short Description" value={desc} onChange={(e) => setDesc(e.target.value)} />
          <Input label="Cover Banner Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
          <div className="pt-4 flex justify-end gap-3 border-t border-black/10">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Category</Button>
          </div>
        </form>
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={!!deleteCandidate} onClose={() => setDeleteCandidate(null)} title="Delete Category">
        <div className="space-y-4">
          <p className="text-xs text-secondary-text">
            Are you sure you want to delete category &ldquo;{deleteCandidate?.name}&rdquo;?
          </p>
          <div className="flex justify-end gap-3 pt-4 border-t border-black/10">
            <Button variant="outline" onClick={() => setDeleteCandidate(null)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
