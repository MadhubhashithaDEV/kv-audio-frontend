import { Route, Routes } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../../components/header";
import Home from "./home";
import Items from "./items";
import Gallery from "./gallery";
import Contact from "./contact";
import ErrorNotFound from "./error";
import ProductOverview from "./productOverview";
import BookingPage from "./bookingPage";

export default function HomePage() {
  return (
    <div className="min-h-screen w-full bg-background flex flex-col">
      <Header />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-1 w-full bg-gradient-to-br from-primary via-primary/95 to-secondary/20"
      >
        <div className="w-full h-full">
          <Routes path="/*">
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/items" element={<Items />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/product/:key" element={<ProductOverview />} />
            <Route path="/" element={<Home />} />
            <Route path="/*" element={<ErrorNotFound />} />
          </Routes>
        </div>
      </motion.div>
    </div>
  );
}
