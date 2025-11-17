// import React, { useState, useMemo } from "react";
import React, { useState, useMemo, useRef, useEffect } from "react";

import {
  Search,
  MapPin,
  Phone,
  Clock,
  Star,
  Filter,
  X,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  Menu,
  Globe,
  Users,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Données seed réalistes pour l'annuaire
const seedData = [
  {
    id: 1,
    name: "Chez Mamadou",
    owner: "Mamadou Diallo",
    category: "Restaurant",
    subcategory: "Cuisine Ouest-Africaine",
    description:
      "Spécialités sénégalaises et maliennes. Thiéboudienne, mafé, attiéké poisson",
    city: "Moscou",
    district: "Yasenevo",
    address: "ul. Paustovskogo 6, korpus 2",
    phone: "+7 (999) 123-4567",
    hours: "11:00 - 23:00",
    rating: 4.8,
    reviews: 45,
    products: ["attiéké", "thiéboudienne", "mafé", "yassa poulet"],
    country: "Sénégal",
  },
  {
    id: 2,
    name: "African Food Store",
    owner: "Grace Okonkwo",
    category: "Commerce",
    subcategory: "Épicerie Africaine",
    description:
      "Produits alimentaires africains: farine de manioc, huile de palme, poissons fumés",
    city: "Moscou",
    district: "Konkovo",
    address: "ul. Profsoyuznaya 126",
    phone: "+7 (916) 234-5678",
    hours: "10:00 - 20:00",
    rating: 4.6,
    reviews: 67,
    products: [
      "attiéké",
      "foutou",
      "gari",
      "huile de palme",
      "poisson fumé",
      "feuilles de manioc",
    ],
    country: "Nigeria",
  },
  {
    id: 3,
    name: "Bella's Hair Salon",
    owner: "Isabella Mensah",
    category: "Services",
    subcategory: "Coiffure Afro",
    description:
      "Coiffure africaine, tresses, locks, tissages. Produits capillaires authentiques",
    city: "Saint-Pétersbourg",
    district: "Centre",
    address: "Nevsky Prospekt 89",
    phone: "+7 (921) 345-6789",
    hours: "09:00 - 21:00",
    rating: 4.9,
    reviews: 89,
    products: ["tresses", "locks", "tissages", "perruques"],
    country: "Ghana",
  },
  {
    id: 4,
    name: "Abidjan Market",
    owner: "Kouassi N'Guessan",
    category: "Commerce",
    subcategory: "Épicerie Africaine",
    description:
      "Spécialiste de produits ivoiriens. Attiéké de qualité supérieure, kedjenou, etc.",
    city: "Moscou",
    district: "Teply Stan",
    address: "ul. Novoyasenevsky prospekt 32",
    phone: "+7 (903) 456-7890",
    hours: "09:00 - 21:00",
    rating: 4.7,
    reviews: 52,
    products: ["attiéké", "kedjenou", "alloco", "bangui", "placali"],
    country: "Côte d'Ivoire",
  },
  {
    id: 5,
    name: "Le Continent",
    owner: "Jean-Pierre Mbemba",
    category: "Restaurant",
    subcategory: "Cuisine Panafricaine",
    description: "Restaurant panafricain avec spécialités de toute l'Afrique",
    city: "Moscou",
    district: "Krasnopresnenskaya",
    address: "ul. 1905 goda 10/1",
    phone: "+7 (985) 567-8901",
    hours: "12:00 - 00:00",
    rating: 4.5,
    reviews: 73,
    products: ["attiéké", "ndolé", "poulet DG", "saka saka", "fufu"],
    country: "Cameroun",
  },
  {
    id: 6,
    name: "Afro Beauty Supply",
    owner: "Fatima Traoré",
    category: "Commerce",
    subcategory: "Cosmétiques et Soins",
    description:
      "Produits de beauté et cosmétiques pour peaux noires et métissées",
    city: "Moscou",
    district: "Yugo-Zapadnaya",
    address: "ul. 26 Baksovskikh Komissarov 6",
    phone: "+7 (926) 678-9012",
    hours: "10:00 - 19:00",
    rating: 4.4,
    reviews: 38,
    products: ["crèmes", "huiles", "savons africains", "encens"],
    country: "Mali",
  },
  {
    id: 7,
    name: "Taste of Lagos",
    owner: "Chidi Okoro",
    category: "Restaurant",
    subcategory: "Cuisine Nigériane",
    description:
      "Spécialités nigérianes authentiques: jollof rice, suya, puff puff",
    city: "Ekaterinbourg",
    district: "Centre",
    address: "ul. Lenina 45",
    phone: "+7 (912) 789-0123",
    hours: "11:00 - 22:00",
    rating: 4.7,
    reviews: 41,
    products: ["jollof rice", "suya", "puff puff", "akara", "moin moin"],
    country: "Nigeria",
  },
  {
    id: 8,
    name: "Afro Textiles",
    owner: "Aminata Sankara",
    category: "Commerce",
    subcategory: "Tissus et Vêtements",
    description:
      "Tissus africains, wax, bazin, vêtements traditionnels sur mesure",
    city: "Moscou",
    district: "Novye Cheryomushki",
    address: "ul. Profsoyuznaya 84",
    phone: "+7 (915) 890-1234",
    hours: "10:00 - 19:00",
    rating: 4.8,
    reviews: 56,
    products: ["wax", "bazin", "boubous", "dashiki"],
    country: "Burkina Faso",
  },
  {
    id: 9,
    name: "Kinshasa Express",
    owner: "Emmanuel Kongo",
    category: "Services",
    subcategory: "Transfert d'Argent",
    description:
      "Transfert d'argent vers l'Afrique, change de devises, services financiers",
    city: "Saint-Pétersbourg",
    district: "Vasileostrovskaya",
    address: "Bolshoy Prospekt 55",
    phone: "+7 (931) 901-2345",
    hours: "09:00 - 18:00",
    rating: 4.6,
    reviews: 94,
    products: ["transfert", "change", "Western Union", "MoneyGram"],
    country: "RD Congo",
  },
  {
    id: 10,
    name: "Africa Spice Market",
    owner: "Aïcha Diop",
    category: "Commerce",
    subcategory: "Épices et Condiments",
    description:
      "Épices africaines authentiques, condiments, sauces traditionnelles",
    city: "Moscou",
    district: "Yasenevo",
    address: "ul. Ayvengo 2",
    phone: "+7 (977) 012-3456",
    hours: "10:00 - 20:00",
    rating: 4.9,
    reviews: 61,
    products: ["soumbala", "dawa dawa", "cube maggi", "épices", "piment"],
    country: "Sénégal",
  },
  {
    id: 11,
    name: "Chez Koffi",
    owner: "Koffi Assouan",
    category: "Restaurant",
    subcategory: "Cuisine Ivoirienne",
    description:
      "Restaurant ivoirien authentique. Spécialiste du garba, attiéké poisson",
    city: "Kazan",
    district: "Vakhitovsky",
    address: "ul. Karla Marksa 53",
    phone: "+7 (843) 123-4567",
    hours: "11:00 - 23:00",
    rating: 4.8,
    reviews: 33,
    products: ["attiéké", "garba", "alloco", "kedjenou", "sauce arachide"],
    country: "Côte d'Ivoire",
  },
  {
    id: 12,
    name: "Afro Music Store",
    owner: "DJ Kwame",
    category: "Services",
    subcategory: "Musique et Événementiel",
    description:
      "DJ pour événements, location de matériel sono, musique africaine",
    city: "Moscou",
    district: "Butovo",
    address: "ul. Starokachalovskaya 6",
    phone: "+7 (964) 234-5678",
    hours: "Sur rendez-vous",
    rating: 4.5,
    reviews: 28,
    products: ["DJ", "animation", "sono", "playlist afro"],
    country: "Ghana",
  },
];

const categories = [
  "Toutes les catégories",
  "Restaurant",
  "Commerce",
  "Services",
];

const cities = [
  "Toutes les villes",
  "Moscou",
  "Saint-Pétersbourg",
  "Ekaterinbourg",
  "Kazan",
];

const annonces = [
  {
    type: "event",
    tag: "ÉVÉNEMENT",
    title: "Soirée Afrobeat & Sabar – 100% Dansant",
    desc: "Avec DJ Kwame et percussionnistes live du Sénégal",
    date: "29 Novembre 2025",
    location: "Club Gipsy, Moscou",
  },
  {
    type: "info",
    tag: "IMPORTANT",
    title: "Nouveau consulat du Mali ouvert à Moscou",
    desc: "Prise de rendez-vous biométrie dès maintenant",
    date: "15 Novembre 2025",
  },
  {
    type: "event",
    tag: "FÊTE",
    title: "Indépendance Côte d'Ivoire – Grand Garba Party",
    desc: "Attiéké & poulet braisé à volonté + concert live",
    date: "7 Décembre 2025",
    location: "Restaurant Chez Koffi, Kazan",
  },
  {
    type: "promo",
    tag: "PROMO",
    title: "-30% sur les tresses chez Bella's Hair Salon",
    desc: "Valable jusqu'au 30 novembre avec le code AFROMIR30",
    date: "Offre limitée",
  },
  {
    type: "event",
    tag: "CULTURE",
    title: "Atelier cuisine sénégalaise avec Mamadou",
    desc: "Apprenez à faire le thiéboudienne comme à Dakar",
    date: "23 Novembre 2025",
    location: "Chez Mamadou, Yasenevo",
  },
  {
    type: "info",
    tag: "ALERTE",
    title: "Changement d'horaire métro ligne orange",
    desc: "Fermeture anticipée les week-ends de novembre",
  },
];

const citiesData = [
  {
    name: "Moscou",
    businessCount: 28,
    image:
      "https://images.unsplash.com/photo-1513326738677-b964603b136d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "Saint-Pétersbourg",
    businessCount: 15,
    image:
      "https://images.unsplash.com/photo-1635237929027-819d8cce4c26?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Ekaterinbourg",
    businessCount: 8,
    image:
      "https://images.unsplash.com/photo-1618941672699-b75ba3cfcbd5?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Kazan",
    businessCount: 6,
    image:
      "https://images.unsplash.com/photo-1504615458222-979e04d69a27?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const categoriesData = [
  { name: "Restaurants", count: 24, icon: "🍽️" },
  { name: "Épiceries", count: 18, icon: "🛒" },
  { name: "Coiffure", count: 12, icon: "💇" },
  { name: "Services", count: 15, icon: "🔧" },
  { name: "Mode & Textile", count: 8, icon: "👗" },
  { name: "Événementiel", count: 6, icon: "🎉" },
];

const AfroMirPro = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    "Toutes les catégories"
  );
  const [selectedCity, setSelectedCity] = useState("Toutes les villes");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);
  const [showPinned, setShowPinned] = useState(true);
  const scrollRef = useRef(null);

  const filteredResults = useMemo(() => {
    let results = seedData;
    if (searchQuery) {
      results = results.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.products.some((p) =>
            p.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }
    if (selectedCategory !== "Toutes les catégories")
      results = results.filter((i) => i.category === selectedCategory);
    if (selectedCity !== "Toutes les villes")
      results = results.filter((i) => i.city === selectedCity);
    return results;
  }, [searchQuery, selectedCategory, selectedCity]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 380;
      scrollRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (!showPinned) return;

    const interval = setInterval(() => {
      setCurrentAnnouncementIndex((prev) => (prev + 1) % annonces.length);
    }, 6000); // ← 6 secondes pour bien lire le texte

    return () => clearInterval(interval);
  }, [showPinned]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header fixe avec ombre douce */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-600 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-black text-lg">AM</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-700 bg-clip-text text-transparent">
                  AfroMir
                </h1>
                <p className="text-xs text-gray-500 -mt-1">
                  Diaspora Afrique • Russie
                </p>
              </div>
            </div>

            {/* Navigation Desktop */}
            <nav className="hidden lg:flex items-center space-x-10">
              {["Annonces", "Villes", "Catégories", "Populaires"].map(
                (item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-700 hover:text-orange-600 font-medium transition"
                  >
                    {item}
                  </a>
                )
              )}
            </nav>

            <div className="flex items-center space-x-4">
              <button className="hidden md:block bg-gradient-to-r from-orange-600 to-amber-600 text-white px-6 py-2.5 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition">
                + Ajouter mon activité
              </button>

              {/* Mobile menu */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden"
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden bg-white border-t border-gray-100"
            >
              <div className="px-4 py-6 space-y-4">
                {["Annonces", "Villes", "Catégories", "Populaires"].map(
                  (item) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      className="block text-gray-700 hover:text-orange-600 font-medium"
                    >
                      {item}
                    </a>
                  )
                )}
                <button className="w-full bg-gradient-to-r from-orange-600 to-amber-600 text-white py-3 rounded-full font-semibold">
                  + Ajouter mon activité
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero avec vidéo ou image forte + overlay élégant */}
      <section className="relative pt-16 h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1556760544-74068565f05c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
            alt="Communauté africaine en Russie"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight"
          >
            Trouvez votre Afrique
            <br />
            <span className="text-amber-400">en Russie</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl text-amber-100 mb-10 max-w-2xl mx-auto"
          >
            Restaurants • Épiceries • Coiffure • Services • Culture
          </motion.p>

          {/* Barre de recherche premium */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl shadow-2xl p-3 max-w-3xl mx-auto"
          >
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Attiéké, tresses, transfert d'argent, jollof..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <button className="bg-gradient-to-r from-orange-600 to-amber-600 text-white px-10 py-4 rounded-xl font-bold hover:shadow-lg transform hover:scale-105 transition flex items-center justify-center">
                <Search className="w-5 h-5 mr-2" />
                Rechercher
              </button>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <Sparkles className="w-8 h-8 text-amber-400 animate-pulse" />
        </div>
      </section>

      {/* Stats animées */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-amber-700 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "350+", label: "Business référencés" },
              { number: "18", label: "Villes couvertes" },
              { number: "42", label: "Pays représentés" },
              { number: "12K+", label: "Visiteurs mensuels" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-black">
                  {stat.number}
                </div>
                <div className="text-amber-100 mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ANNONCES - Version Mobile */}
      <section id="annonces" className="py-12 bg-white lg:hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Annonces & Événements
            </h2>
            <p className="text-gray-600">
              Ne ratez rien de la vie de la communauté
            </p>
          </div>

          <div className="space-y-4">
            {annonces.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-4 border border-orange-100 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  {/* Badge */}
                  <div className="flex-shrink-0">
                    <span
                      className={`text-xs font-bold uppercase px-2 py-1 rounded-full ${
                        item.type === "event"
                          ? "bg-purple-100 text-purple-700"
                          : item.type === "info"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {item.tag}
                    </span>
                  </div>

                  {/* Contenu */}
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-sm leading-tight mb-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-xs mb-2">{item.desc}</p>

                    <div className="flex items-center text-xs text-gray-500 space-x-3">
                      {item.date && (
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {item.date}
                        </span>
                      )}
                      {item.location && (
                        <span className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {item.location}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dernières annonces – carrousel premium */}
      <section id="listings" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-4xl font-bold text-gray-900">
                Nouveautés de la communauté
              </h2>
              <p className="text-gray-600 mt-2">
                Les derniers business ajoutés
              </p>
            </div>
            <div className="hidden md:flex space-x-3">
              <button
                onClick={() => scroll("left")}
                className="w-12 h-12 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition"
              >
                <ArrowLeft className="w-6 h-6 mx-auto" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-12 h-12 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition"
              >
                <ArrowRight className="w-6 h-6 mx-auto" />
              </button>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          >
            {filteredResults.slice(0, 10).map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -8 }}
                className="min-w-[380px] md:min-w-[400px] bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden group"
              >
                <div className="h-48 bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
                  <div className="text-6xl">
                    {item.country === "Côte d'Ivoire"
                      ? "🇨🇮"
                      : item.country === "Nigeria"
                      ? "🇳🇬"
                      : "🌍"}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {item.name}
                      </h3>
                      <p className="text-orange-600 font-medium">
                        {item.subcategory}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                      <span className="ml-1 font-bold">{item.rating}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                    {item.description}
                  </p>

                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 mr-2 text-orange-600" />
                    {item.district}, {item.city}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.products.slice(0, 3).map((p, i) => (
                      <span
                        key={i}
                        className="bg-amber-100 text-amber-800 px-3 py-1.5 rounded-full text-xs font-medium"
                      >
                        {p}
                      </span>
                    ))}
                  </div>

                  <button className="w-full bg-gradient-to-r from-orange-600 to-amber-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition transform hover:scale-105">
                    Contacter • {item.phone}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Villes */}
      <section id="cities" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Explorer par ville
          </h2>
          <p className="text-center text-gray-600 mb-12">
            La diaspora africaine partout en Russie
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {citiesData.map((city) => (
              <motion.div
                key={city.name}
                whileHover={{ scale: 1.05 }}
                className="relative rounded-3xl overflow-hidden shadow-2xl group cursor-pointer h-80"
              >
                <img
                  src={city.image}
                  alt={city.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-3xl font-bold mb-2">{city.name}</h3>
                  <p className="flex items-center text-amber-300">
                    <Users className="w-5 h-5 mr-2" />
                    {city.businessCount} établissements
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 bg-gradient-to-br from-orange-600 via-amber-600 to-yellow-600">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-5xl font-black mb-6">
            Faites grandir votre business
          </h2>
          <p className="text-xl text-amber-100 mb-10">
            Rejoignez la plateforme n°1 de la diaspora africaine en Russie
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-white text-orange-600 px-10 py-5 rounded-full text-xl font-bold shadow-2xl hover:shadow-orange-300 transform hover:scale-110 transition">
              Ajouter mon activité gratuitement
            </button>
            <button className="border-4 border-white text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-white hover:text-orange-600 transition">
              Voir toutes les annonces
            </button>
          </div>
        </div>
      </section>

      {/* ====== TOAST ANNONCES - BAS À DROITE (change toutes les 6s) ====== */}
      {showPinned && (
        <div className="fixed bottom-6 right-6 z-50">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentAnnouncementIndex}
              initial={{ opacity: 0, x: 100, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 100, y: 20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative"
            >
              {/* Carte toast */}
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-5 max-w-sm w-96 overflow-hidden">
                {/* Dégradé décoratif en haut */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 rounded-t-2xl" />

                <div className="flex gap-4">
                  {/* Icône colorée */}
                  <div className="flex-shrink-0">
                    {annonces[currentAnnouncementIndex].type === "event" && (
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                        Party Popper
                      </div>
                    )}
                    {annonces[currentAnnouncementIndex].type === "info" && (
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                        Megaphone
                      </div>
                    )}
                    {annonces[currentAnnouncementIndex].type === "promo" && (
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                        Gift
                      </div>
                    )}
                  </div>

                  {/* Contenu */}
                  <div className="flex-1 pr-8">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-orange-100 text-orange-700">
                        {annonces[currentAnnouncementIndex].tag}
                      </span>
                      {annonces[currentAnnouncementIndex].date && (
                        <span className="text-xs text-gray-500 flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {annonces[currentAnnouncementIndex].date}
                        </span>
                      )}
                    </div>

                    <h4 className="font-bold text-gray-900 leading-tight">
                      {annonces[currentAnnouncementIndex].title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {annonces[currentAnnouncementIndex].desc}
                    </p>

                    {/* Bouton voir plus + fermer */}
                    <div className="flex items-center justify-between mt-4">
                      <a
                        href="/events"
                        className="text-orange-600 font-semibold text-sm hover:underline flex items-center gap-1"
                      >
                        Voir plus
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Bouton fermer */}
                  <button
                    onClick={() => setShowPinned(false)}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Petits points indicateurs */}
                <div className="flex justify-center gap-1.5 mt-4">
                  {annonces.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        i === currentAnnouncementIndex
                          ? "w-6 bg-orange-500"
                          : "w-1 bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* Footer premium */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-amber-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-black text-xl">AM</span>
                </div>
                <h3 className="text-2xl font-bold">AfroMir</h3>
              </div>
              <p className="text-gray-400">
                La référence de la diaspora africaine en Russie depuis 2024.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Navigation</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#annonces" className="hover:text-white">
                    Annonces
                  </a>
                </li>
                <li>
                  <a href="#cities" className="hover:text-white">
                    Villes
                  </a>
                </li>
                <li>
                  <a href="#listings" className="hover:text-white">
                    Business
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Pour les entreprises</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Ajouter mon activité
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Publicité
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Statistiques
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <p className="text-gray-400">
                contact@afromir.ru
                <br />
                +7 (999) 000-11-22
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
            © 2025 AfroMir Russie • Tous droits réservés
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AfroMirPro;
