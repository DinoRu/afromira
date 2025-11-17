import React, { useState, useMemo } from "react";
import { Globe, Users } from "lucide-react";
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
} from "lucide-react";

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
      "https://images.unsplash.com/photo-1556543696-81813620f4de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "Ekaterinbourg",
    businessCount: 8,
    image:
      "https://images.unsplash.com/photo-1596484552996-4e4661c46e47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "Kazan",
    businessCount: 6,
    image:
      "https://images.unsplash.com/photo-1591637333184-19aa84bdd4b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
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

const DiasporaDirectory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    "Toutes les catégories"
  );
  const [selectedCity, setSelectedCity] = useState("Toutes les villes");
  const [currentScroll, setCurrentScroll] = useState(0);

  const filteredResults = useMemo(() => {
    let results = seedData;
    // ... logique de filtrage existante
    return results;
  }, [searchQuery, selectedCategory, selectedCity]);

  const scrollContainer = (direction) => {
    const container = document.getElementById("scroll-container");
    const scrollAmount = 300;
    const newScroll =
      direction === "right"
        ? currentScroll + scrollAmount
        : currentScroll - scrollAmount;

    setCurrentScroll(newScroll);
    container.scrollTo({ left: newScroll, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-orange-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">AF</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">AfroMir</h1>
                <p className="text-xs text-gray-500">Russie</p>
              </div>
            </div>

            <nav className="hidden md:flex space-x-8">
              <a
                href="#listings"
                className="text-gray-700 hover:text-orange-500 font-medium"
              >
                Annonces
              </a>
              <a
                href="#cities"
                className="text-gray-700 hover:text-orange-500 font-medium"
              >
                Villes
              </a>
              <a
                href="#categories"
                className="text-gray-700 hover:text-orange-500 font-medium"
              >
                Catégories
              </a>
              <a
                href="#popular"
                className="text-gray-700 hover:text-orange-500 font-medium"
              >
                Populaires
              </a>
            </nav>

            <button className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition shadow-sm">
              Ajouter mon activité
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section avec image de fond */}
      <section
        className="relative py-20 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1556760544-74068565f05c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
        }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h1 className="text-5xl font-bold mb-6">
            Votre communauté africaine en Russie
          </h1>
          <p className="text-xl mb-8 text-orange-100">
            Trouvez des produits, services et entrepreneurs de la diaspora
            africaine près de chez vous
          </p>

          {/* Barre de recherche hero */}
          <div className="bg-white rounded-2xl shadow-2xl p-2 max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row gap-2 items-center">
              <input
                type="text"
                placeholder="Rechercher un business, produit ou service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none text-gray-800"
              />
              <button className="bg-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-orange-600 transition flex items-center justify-center">
                <Search className="w-5 h-5 mr-2" />
                Rechercher
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-orange-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-orange-600">150+</div>
              <div className="text-gray-600">Business listés</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600">12</div>
              <div className="text-gray-600">Villes couvertes</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600">25+</div>
              <div className="text-gray-600">Catégories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600">5K+</div>
              <div className="text-gray-600">Utilisateurs</div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Listings - Défilement horizontal */}
      <section id="listings" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                Dernières annonces
              </h2>
              <p className="text-gray-600 mt-2">
                Découvrez les nouveaux business de la communauté
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => scrollContainer("left")}
                className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollContainer("right")}
                className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div
            id="scroll-container"
            className="flex space-x-6 overflow-x-auto pb-6 scrollbar-hide scroll-smooth"
            style={{ scrollBehavior: "smooth" }}
          >
            {filteredResults.map((item) => (
              <div
                key={item.id}
                className="min-w-[350px] bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {item.name}
                      </h3>
                      <p className="text-orange-500 font-medium">
                        {item.subcategory}
                      </p>
                    </div>
                    <span className="text-2xl">
                      {item.country === "Côte d'Ivoire"
                        ? "🇨🇮"
                        : item.country === "Sénégal"
                        ? "🇸🇳"
                        : item.country === "Nigeria"
                        ? "🇳🇬"
                        : "🌍"}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">
                    {item.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-700">
                      <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                      <span>
                        {item.district}, {item.city}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <Phone className="w-4 h-4 mr-2 text-orange-500" />
                      <span>{item.phone}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.products.slice(0, 3).map((product, idx) => (
                      <span
                        key={idx}
                        className="bg-orange-50 text-orange-700 px-3 py-1 rounded-lg text-xs font-medium"
                      >
                        {product}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1 font-bold text-gray-800">
                        {item.rating}
                      </span>
                      <span className="ml-1 text-gray-500 text-sm">
                        ({item.reviews})
                      </span>
                    </div>
                    <button className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 transition">
                      Contacter
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore by City */}
      <section id="cities" className="py-16 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">
              Explorer par ville
            </h2>
            <p className="text-gray-600 mt-2">
              Découvrez les business africains dans votre ville
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {citiesData.map((city, index) => (
              <div
                key={index}
                className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group h-64"
              >
                <img
                  src={city.image}
                  alt={city.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{city.name}</h3>
                  <div className="flex items-center text-orange-200">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{city.businessCount} business</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Most Popular Categories */}
      <section id="categories" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">
              Catégories populaires
            </h2>
            <p className="text-gray-600 mt-2">Parcourez par type d'activité</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categoriesData.map((category, index) => (
              <div
                key={index}
                className="bg-white border-2 border-orange-100 rounded-2xl p-6 text-center hover:border-orange-300 hover:shadow-lg transition-all duration-300 group cursor-pointer"
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition duration-300">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">
                  {category.name}
                </h3>
                <p className="text-orange-500 text-sm">
                  {category.count} business
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-500">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">
            Rejoignez notre communauté
          </h2>
          <p className="text-xl mb-8 text-orange-100">
            Listez votre business et augmentez votre visibilité auprès de la
            communauté africaine en Russie
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-orange-500 px-8 py-3 rounded-xl font-semibold hover:bg-orange-50 transition shadow-lg">
              Ajouter mon business
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-orange-500 transition">
              Découvrir plus
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">AF</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">AfroMir</h3>
                  <p className="text-gray-400 text-sm">Russie</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                La plateforme de référence pour la diaspora africaine en Russie
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Navigation</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-orange-500 transition">
                    Accueil
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500 transition">
                    Business
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500 transition">
                    Villes
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500 transition">
                    Catégories
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Entreprises</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-orange-500 transition">
                    Ajouter un business
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500 transition">
                    Devenir partenaire
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500 transition">
                    Publicité
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>support@afromir.ru</li>
                <li>+7 (999) 123-4567</li>
                <li>Moscou, Russie</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>© 2025 AfroMir Russie. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DiasporaDirectory;
