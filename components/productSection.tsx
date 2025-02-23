import ProductCard from "@/components/products/productCard";

export default function ProductSection(){
    const products = [
        {
            name: "Red Hat",
            href: "#",
            image: "https://bundui-images.netlify.app/products/04.jpeg",
            price: "$28",
            category: "Clothing"
        },
        {
            name: "Red Hat",
            href: "#",
            image: "https://bundui-images.netlify.app/products/04.jpeg",
            price: "$28",
            category: "Clothing"
        },
        {
            name: "Red Hat",
            href: "#",
            image: "https://bundui-images.netlify.app/products/04.jpeg",
            price: "$28",
            category: "Clothing"
        },
        {
            name: "Red Hat",
            href: "#",
            image: "https://bundui-images.netlify.app/products/04.jpeg",
            price: "$28",
            category: "Clothing"
        },
    ]
    return (
        <div className="grid grid-cols-4 mx-auto gap-9 mt-4">    
            {
                products.map((src: any, index: number) => (
                    <ProductCard key={index} product={src} />
                ))
            }
        </div>
    )
}