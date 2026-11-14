"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

type Product = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  product_type: string | null;
};

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState<"en" | "ar">("en");

  useEffect(() => {
    async function loadProducts() {
      if (!supabase) {
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from("products")
        .select("id,name,description,price,image_url,product_type")
        .eq("is_active", true)
        .order("created_at", { ascending: false });
      if (!error && data) setProducts(data as Product[]);
      setLoading(false);
    }
    void loadProducts();
  }, []);

  const ar = language === "ar";

  return (
    <main dir={ar ? "rtl" : "ltr"}>
      <header className="topbar">
        <a className="brand" href="/">نُور <span>MARKET</span></a>
        <nav>
          <a href="#shop">{ar ? "تسوّق" : "Shop"}</a>
          <a href="#about">{ar ? "من نحن" : "About"}</a>
          <a href="#contact">{ar ? "اتصل بنا" : "Contact"}</a>
        </nav>
        <div className="actions">
          <button className="language" onClick={() => setLanguage(ar ? "en" : "ar")}>{ar ? "English" : "العربية"}</button>
          <a className="login" href="/account">{ar ? "حسابي" : "My account"}</a>
        </div>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">{ar ? "المعرفة في متناول يدك" : "KNOWLEDGE AT YOUR FINGERTIPS"}</p>
          <h1>{ar ? "اكتشف كتباً وموارد تلهم رحلتك" : "Discover books and resources that inspire your journey."}</h1>
          <p>{ar ? "كتب رقمية وموارد تعليمية وإسلامية في مكان واحد." : "Digital books, educational materials and Islamic learning resources in one place."}</p>
          <a className="primary" href="#shop">{ar ? "تصفح المنتجات" : "Explore the collection"}</a>
        </div>
        <div className="hero-art" aria-hidden="true"><div className="book book-one">نور العلم</div><div className="book book-two">READ<br/>GROW</div><div className="sun" /></div>
      </section>

      <section className="section" id="shop">
        <div className="section-heading">
          <div><p className="eyebrow">{ar ? "اختر ما يناسبك" : "THE COLLECTION"}</p><h2>{ar ? "أحدث المنتجات" : "Explore our products"}</h2></div>
          <span>{products.length} {ar ? "منتج" : "products"}</span>
        </div>
        {!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? (
          <div className="notice">Connect your Supabase project using the environment variables to display products.</div>
        ) : loading ? (
          <div className="notice">Loading products…</div>
        ) : products.length === 0 ? (
          <div className="empty"><h3>{ar ? "قريباً!" : "A new collection is coming."}</h3><p>{ar ? "ستظهر المنتجات هنا عند إضافتها من لوحة الإدارة." : "Products will appear here after they are added to your store."}</p></div>
        ) : (
          <div className="grid">
            {products.map((product) => (
              <article className="product" key={product.id}>
                <div className="product-image">{product.image_url ? <img src={product.image_url} alt={product.name} /> : <span>نُور</span>}</div>
                <div className="product-info"><small>{product.product_type || "Digital resource"}</small><h3>{product.name}</h3><p>{product.description}</p><strong>₦{Number(product.price).toLocaleString("en-NG")}</strong></div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="about" id="about"><p className="eyebrow">NŪR MARKET</p><h2>{ar ? "المعرفة تنير الطريق" : "A thoughtful place to learn, read and grow."}</h2><p>{ar ? "متجر يجمع الموارد التعليمية والكتب الرقمية." : "A carefully organised home for educational, general and Islamic digital resources."}</p></section>
      <footer id="contact"><a className="brand" href="/">نُور <span>MARKET</span></a><p>© {new Date().getFullYear()} Nūr Market</p><a href="mailto:hello@nurmarket.example">Contact the store</a></footer>
    </main>
  );
}
