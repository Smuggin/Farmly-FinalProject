import Navbar from "@/components/nav";
import StorefrontPage from "@/components/store/storefrontpage";

export default function StorePage() {
    return (
        <>
            <Navbar />
            <div className="mx-auto max-w-7xl">
                <StorefrontPage />
            </div>
        </>
    );
}