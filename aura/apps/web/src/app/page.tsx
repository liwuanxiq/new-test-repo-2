'use client';

import { motion } from 'framer-motion';
import { Search, ShoppingBag, Heart, Sparkles, Zap, Users, Shield } from 'lucide-react';
import Link from 'next/link';
import { ProductCard } from '@/components/product/ProductCard';
import { AICompanionWidget } from '@/components/ai/AICompanionWidget';

// Mock featured products - will come from API
const featuredProducts = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 299.99,
    originalPrice: 399.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    rating: 4.8,
    reviews: 234,
    trustScore: 94,
    badge: 'AI Pick',
  },
  {
    id: '2',
    name: 'Smart Fitness Watch Pro',
    price: 449.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    rating: 4.9,
    reviews: 567,
    trustScore: 91,
    badge: 'Trending',
  },
  {
    id: '3',
    name: 'Minimalist Leather Backpack',
    price: 189.99,
    originalPrice: 249.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    rating: 4.7,
    reviews: 189,
    trustScore: 88,
    badge: 'Eco-Friendly',
  },
  {
    id: '4',
    name: 'Ergonomic Office Chair',
    price: 599.99,
    image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=500',
    rating: 4.6,
    reviews: 423,
    trustScore: 92,
    badge: 'Best Seller',
  },
];

const categories = [
  { name: 'Electronics', icon: '💻', count: 1234 },
  { name: 'Fashion', icon: '👕', count: 5678 },
  { name: 'Home & Living', icon: '🏠', count: 3456 },
  { name: 'Sports', icon: '⚽', count: 2345 },
  { name: 'Beauty', icon: '✨', count: 4567 },
  { name: 'Books', icon: '📚', count: 8901 },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 glass border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-aura-500" />
              <span className="text-xl font-bold gradient-text">Aura</span>
            </Link>

            <div className="flex-1 max-w-xl mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search with AI..."
                  className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-aura-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-aura-500" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors relative">
                <Heart className="w-6 h-6 text-slate-600" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>
              <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors relative">
                <ShoppingBag className="w-6 h-6 text-slate-600" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-aura-500 text-white text-xs rounded-full flex items-center justify-center">
                  2
                </span>
              </button>
              <button className="px-4 py-2 gradient-bg text-white rounded-xl font-medium hover:opacity-90 transition-opacity">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-aura-50 via-white to-accent-50" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-aura-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float animation-delay-300" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl lg:text-7xl font-bold font-display mb-6">
              <span className="gradient-text">Shopping</span>
              <br />
              <span className="text-slate-800">Reimagined with AI</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
              Experience the future of e-commerce with personalized AI companions, 
              immersive 3D previews, and intelligent recommendations that understand you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-8 py-4 gradient-bg text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                Start Shopping
              </button>
              <button className="px-8 py-4 glass text-slate-700 rounded-xl font-semibold text-lg hover:bg-white/80 transition-all duration-300">
                Explore Features
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={Sparkles}
              title="AI Shopping Companion"
              description="Your personal shopping assistant that learns your preferences"
              color="from-aura-400 to-aura-600"
            />
            <FeatureCard
              icon={Zap}
              title="Instant Recommendations"
              description="Real-time suggestions based on your behavior and needs"
              color="from-amber-400 to-orange-500"
            />
            <FeatureCard
              icon={Users}
              title="Social Shopping"
              description="Shop together with friends in real-time"
              color="from-pink-400 to-rose-500"
            />
            <FeatureCard
              icon={Shield}
              title="Trust Verified"
              description="AI-powered authenticity and transparency scores"
              color="from-green-400 to-emerald-500"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass p-6 rounded-2xl text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <span className="text-4xl mb-3 block">{category.icon}</span>
                <h3 className="font-semibold text-slate-800">{category.name}</h3>
                <p className="text-sm text-slate-500 mt-1">{category.count} items</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-slate-800">Featured Products</h2>
            <Link href="/products" className="text-aura-500 hover:text-aura-600 font-medium">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-aura-500 via-accent-500 to-aura-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Experience the Future?</h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of shoppers who are already enjoying personalized, 
            intelligent shopping with Aura.
          </p>
          <button className="px-10 py-4 bg-white text-aura-600 rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
            Get Started Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold text-white mb-4">Shop</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white transition-colors">All Products</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Categories</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Deals</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">New Arrivals</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Shipping</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Returns</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Press</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Terms</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-800 text-center text-sm">
            <p>&copy; 2024 Aura Commerce. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* AI Companion Widget */}
      <AICompanionWidget />
    </div>
  );
}

function FeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  color 
}: { 
  icon: any; 
  title: string; 
  description: string; 
  color: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-lg font-semibold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-600 text-sm">{description}</p>
    </motion.div>
  );
}
