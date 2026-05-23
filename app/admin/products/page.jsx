"use client";
import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Edit2, Trash2, Plus, Package } from "lucide-react";
import axios from "axios";
import { adminurl, adminimg } from "../adminCompo/adminapis";

import toast from "react-hot-toast";
import DeletePopup from "../../components/DeletePopup";

// Enable credentials for all admin requests
axios.defaults.withCredentials = true;


export default function ProductsPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const [popupOpen, setPopupOpen] = useState(false);
	const [deleteId, setDeleteId] = useState(null);



	const openDeletePopup = (id) => {
		setDeleteId(id);
		setPopupOpen(true);
	};



	const fetchProducts = async () => {
		try {
			setLoading(true);
			setError(null);
			const response = await axios.get(`${adminurl}/product`, {
				withCredentials: true
			});
			const data = response.data;
			if (data.success) {
				setProducts(data.product);
			} else {
				setError("Failed to fetch products");
			}
		} catch (err) {
			console.error("Error fetching products:", err);
			setError("Failed to load products. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	const fetchCategories = async () => {
		try {
			const response = await axios.get(`${adminurl}/category`, {
				withCredentials: true
			});
			const data = response.data;
			if (data.success) {
				setCategories(data.category);
			}
		} catch (err) {
			console.error("Error fetching categories:", err);
		}
	};

	const handleConfirmDelete = async () => {
		setPopupOpen(false);

		const toastId = toast.loading("Deleting...");

		try {
			const response = await axios.delete(`${adminurl}/product/${deleteId}`, {
				withCredentials: true
			});
			if (response.data.success) {
				fetchProducts(); // Refresh products
				toast.success("Product deleted successfully! 🗑️", { id: toastId });
			} else {
				toast.error("Failed to delete product!", { id: toastId });
			}
		} catch (err) {
			console.error(err);
			toast.error("Failed to delete product. Please try again.", { id: toastId });
		}
	};

	useEffect(() => {
		fetchProducts();
		fetchCategories();
	}, []);

	const filtered = useMemo(() => {
		return products.filter((product) => {
			const search = searchTerm.trim().toLowerCase();
			const matchesSearch =
				product.name.toLowerCase().includes(search) ||
				product.description?.toLowerCase().includes(search) ||
				product.category?.toLowerCase().includes(search);
			const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
			return matchesSearch && matchesCategory;
		});
	}, [products, searchTerm, selectedCategory]);

	const safeParseJSON = (str) => {
		try {
			return JSON.parse(str);
		} catch (e) {
			return [];
		}
	};

	return (
		<div className="container mx-auto px-7 py-8 font-sans">

			<div className="flex justify-between items-start mb-8">
				<div>
					<h1 className="text-3xl font-bold text-text">Products</h1>
					<p className="text-text text-sm mt-1">Manage your product inventory</p>
				</div>

				<Link
					href="/admin/products/create"
					className="flex items-center gap-2 bg-accent hover:bg-accent text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg"
				>
					<Plus size={20} />
					Add Product
				</Link>
			</div>

			<div className="bg-background border border-gray-400 rounded-lg p-4 mb-6">
				<div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
					<div className="relative flex-1">
						<Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-[#252729b8] w-5 h-5" />
						<input
							type="text"
							placeholder="Search products by name, description, or category..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full pl-12 pr-5 py-3 bg-background border border-highlight rounded-lg text-text placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
						/>
					</div>

					<select
						value={selectedCategory}
						onChange={(e) => setSelectedCategory(e.target.value)}
						className="px-4 py-3 bg-background border border-highlight rounded-lg text-text font-medium focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
						style={{ backgroundImage: 'none' }}
					>
						<option value="all">All Categories</option>
						{categories.map((cat) => (
							<option key={cat.id} value={cat.name}>
								{cat.name}
							</option>
						))}
					</select>
				</div>
			</div>

			{loading ? (
				<div className="text-center py-12">
					<div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
					<p className="mt-2 text-text">Loading products...</p>
				</div>
			) : error ? (
				<div className="text-center py-12 bg-red-50 rounded-lg">
					<p className="text-red-600">{error}</p>
					<button
						onClick={fetchProducts}
						className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
					>
						Retry
					</button>
				</div>
			) : (
				<>
					<p className="text-text mb-6">
						Showing <strong>{filtered.length}</strong> of {products.length} products
					</p>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
						{filtered.length === 0 ? (
							<div className="col-span-full text-center py-12 bg-background rounded-2xl shadow">
								<Package className="w-16 h-16 text-gray-[#252729b8] mx-auto mb-4" />
								<p className="text-gray-700 text-lg">No products found</p>
							</div>
						) : (
							filtered.map((product) => {
								const images = safeParseJSON(product.images);
								const firstImage = images.length > 0 ? images[0] : null;
								const variants = product.variants ? safeParseJSON(product.variants) : [];

								return (
									<div key={product.id} className="bg-background rounded-lg shadow p-5 relative border border-highlight">
										{(product.is_best_seller === 1 || product.is_best_seller === "1" || product.is_best_seller === true) && (
											<span className="bg-amber-500 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full absolute top-3 left-3 shadow-sm z-10">
												Best Seller
											</span>
										)}
										<div className="absolute top-3 right-3 flex items-center gap-2">
											<Link href={`/admin/products/edit/${product.id}`} className="text-primary transition" title="Edit">
												<Edit2 className="w-5 h-5" />
											</Link>
											<button
												title="Delete"
												onClick={() => openDeletePopup(product.id)}
												className="text-red-600 transition hover:text-red-800"
											>
												<Trash2 className="w-5 h-5" />
											</button>

										</div>

										<div className="mb-4">
											{firstImage ? (
												<Image
													src={`${adminimg}/uploads/${firstImage}`}
													alt={product.name}
													width={200}
													height={150}
													className="w-40 h-40 rounded-lg object-cover border  mx-auto"
												/>
											) : (
												<div className="w-full h-32 bg-background00 rounded-lg flex items-center justify-center">
													<Package className="w-8 h-8 text-gray-[#252729b8]" />
												</div>
											)}
										</div>

										<h3 className="text-lg font-semibold text-text mb-2 line-clamp-2">
											{product.name}
										</h3>

										<p className="text-sm text-text mb-2">{product.category}</p>

										<div className="flex items-center justify-between">
											<div className="flex flex-col">
												<span className="text-lg font-bold text-accent">₹{product.price}</span>
												{product.old_price && (
													<span className="text-sm text-gray-700 line-through">₹{product.old_price}</span>
												)}
											</div>
											<div className="text-right">
												{variants.length > 0 ? (
													<div className="flex flex-col gap-0.5">
														<span className="text-xs text-gray-500 font-medium">Base: <span className={product.stock > 0 ? 'text-accent font-bold' : 'text-red-600 font-bold'}>{product.stock > 0 ? `${product.stock}` : '0'}</span></span>
														{variants.map((v, vi) => (
															<span key={vi} className={`text-xs font-semibold ${parseInt(v.stock) > 0 ? 'text-primary' : 'text-red-500'}`}>
																{v.name}: {parseInt(v.stock) > 0 ? v.stock : '0'}
															</span>
														))}
													</div>
												) : (
													<span className={`text-sm font-medium ${product.stock > 0 ? 'text-accent' : 'text-red-600'}`}>
														{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
													</span>
												)}
												{product.unit_quantity && (
													<div className="text-xs text-gray-700 mt-1">
														{product.unit_quantity}
													</div>
												)}
												{variants.length > 0 && (
													<div className="text-xs text-primary font-semibold mt-1">
														{variants.length} variant{variants.length > 1 ? 's' : ''}
													</div>
												)}
											</div>
										</div>
									</div>
								);
							})
						)}
					</div>

					{/* DELETE POPUP */}
					<DeletePopup
						isOpen={popupOpen}
						title="Delete Product?"
						message="This action cannot be undone."
						onCancel={() => setPopupOpen(false)}
						onConfirm={handleConfirmDelete}
					/>
				</>
			)}
		</div>
	);
}
