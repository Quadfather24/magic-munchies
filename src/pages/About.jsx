import { useState, useEffect } from "react";
import { Coffee, Cake, Cookie, IceCream, Candy, Heart } from "lucide-react";

const About = () => {
  // State to manage image loading
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [companyImagesLoaded, setCompanyImagesLoaded] = useState({});

  // Define image paths - Note: These should be imported if using a bundler like webpack/vite
  // or referenced from the public directory if using Next.js
  const PROFILE_IMAGE = "/images/profile/profile.jpeg";

  const companyImages = [
    {
      path: "/images/about-buisness/eastlogo.png",
      name: "East Company",
      width: 400,
      height: 400,
    },
    {
      path: "/images/about-buisness/allstar-about.png",
      name: "West Company",
      width: 400,
      height: 400,
    },
    {
      path: "/images/about-buisness/golden-crescent-about.png",
      name: "North Company",
      width: 400,
      height: 400,
    },
    {
      path: "/images/about-buisness/iconic-about.jpg",
      name: "South Company",
      width: 400,
      height: 400,
    },
  ];

  useEffect(() => {
    // Preload profile image
    const img = new Image();
    img.src = PROFILE_IMAGE;
    img.onload = () => {
      setProfileLoaded(true);
    };

    // Preload company images
    companyImages.forEach((company, index) => {
      const img = new Image();
      img.src = company.path;
      img.onload = () => {
        setCompanyImagesLoaded((prev) => ({
          ...prev,
          [index]: true,
        }));
      };
    });
  }, []);

  return (
    <div className="min-h-screen bg-magic-gradient">
      <div className="container mx-auto px-4 py-16">
        <div className="relative">
          {/* Profile Image with Loading State */}
          <div className="mx-auto w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-magicPurple shadow-xl relative">
            {/* Loading placeholder */}
            <div
              className="absolute inset-0 bg-gray-200 transition-opacity duration-300"
              style={{ opacity: profileLoaded ? 0 : 1 }}
            />
            <img
              src={PROFILE_IMAGE}
              alt="Business Owner"
              className="w-full h-full object-cover transition-opacity duration-300"
              style={{
                opacity: profileLoaded ? 1 : 0,
                position: "relative",
                zIndex: 1,
              }}
              width={320}
              height={320}
              onLoad={() => setProfileLoaded(true)}
              fetchPriority="high"
            />
          </div>

          {/* Decorative Elements - Positioned absolutely relative to profile */}
          <div className="absolute -top-4 -right-4 z-10">
            <Cake className="text-magicHot w-8 h-8 rotate-12" />
          </div>
          <div className="absolute -bottom-4 -left-4 z-10">
            <Cookie className="text-amber-700 w-8 h-8 rotate-12" />
          </div>
          <div className="absolute top-1/2 -right-4 z-10">
            <IceCream className="text-magicPurple w-8 h-8 -rotate-12" />
          </div>
          <div className="absolute top-1/2 -left-4 z-10">
            <Candy className="text-magicPink w-8 h-8 rotate-90" />
          </div>
        </div>

        {/* Owner Info and About Content */}
        <div className="text-center mt-8">
          <h1 className="text-4xl font-bold text-gray-800">Claudia</h1>
          <span className="text-base font-bold text-gray-800">Owner</span>
          <p className="text-xl text-magicPurple mt-4">
            Crafting Joy, One Dessert at a Time
          </p>
        </div>

        <div className="mt-16 max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Our Sweet Story
          </h2>
          <div className="space-y-4 text-gray-600">
            <p>
              Welcome to my world of sweetness! I'm Claudia, a passionate baker
              with over a decade of experience in creating memorable dessert
              experiences. My journey began in my grandmother's kitchen, where I
              first discovered the magic of turning simple ingredients into
              extraordinary treats.
            </p>
            <p>
              What sets me apart is my commitment to using only the finest
              ingredients while incorporating innovative techniques to create
              desserts that are both visually stunning and incredibly delicious.
              Every creation that leaves my kitchen is crafted with love,
              attention to detail, and a touch of magic.
            </p>
          </div>
        </div>

        {/* Company Images Grid with Loading States */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            Proud to Serve
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {companyImages.map((company, index) => (
              <div key={index} className="aspect-square relative group">
                <div className="w-full h-full bg-white rounded-xl overflow-hidden shadow-md transition-transform duration-300 transform group-hover:scale-105">
                  {/* Loading placeholder */}
                  <div
                    className="absolute inset-0 bg-gray-200 transition-opacity duration-300"
                    style={{ opacity: companyImagesLoaded[index] ? 0 : 1 }}
                  />
                  <img
                    src={company.path}
                    alt={company.name}
                    className="w-full h-full object-cover transition-opacity duration-300"
                    style={{
                      opacity: companyImagesLoaded[index] ? 1 : 0,
                      position: "relative",
                      zIndex: 1,
                    }}
                    width={company.width}
                    height={company.height}
                    onLoad={() =>
                      setCompanyImagesLoaded((prev) => ({
                        ...prev,
                        [index]: true,
                      }))
                    }
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Highlights Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <Coffee className="mx-auto text-magicPink w-12 h-12 mb-4" />
            <h3 className="font-bold text-gray-800 mb-2">Custom Orders</h3>
            <p className="text-gray-600">
              Personalized desserts crafted to your exact specifications
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <Cake className="mx-auto text-magicPink w-12 h-12 mb-4" />
            <h3 className="font-bold text-gray-800 mb-2">Fresh Daily</h3>
            <p className="text-gray-600">
              Made fresh every morning with premium ingredients
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <Heart className="mx-auto text-magicPink w-12 h-12 mb-4" />
            <h3 className="font-bold text-gray-800 mb-2">Made with Love</h3>
            <p className="text-gray-600">
              Every dessert is crafted with passion and care
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
