import dipStraw from "../assets/dipped-strawberry.png";

const products = [
  {
    id: 1,
    name: "Chocolate Dipped Strawberry",
    href: "#",
    imageSrc: dipStraw,
    imageAlt: "Chocolate dipped strawberries in a decorative box.",
    // Multiple price options:
    priceOptions: [
      { label: "Half Dozen", price: "$20" },
      { label: "One Dozen", price: "$35" },
      { label: "Two Dozen", price: "$60" },
    ],
  },
  {
    id: 2,
    name: "Nomad Tumbler",
    href: "#",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-02.jpg",
    imageAlt:
      "Olive drab green insulated bottle with flared screw lid and flat top.",
    priceOptions: [
      { label: "Regular", price: "$35" },
      { label: "Gift Set", price: "$45" },
    ],
  },
  {
    id: 2,
    name: "Nomad Tumbler",
    href: "#",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-02.jpg",
    imageAlt:
      "Olive drab green insulated bottle with flared screw lid and flat top.",
    priceOptions: [
      { label: "Regular", price: "$35" },
      { label: "Gift Set", price: "$45" },
    ],
  },
  {
    id: 2,
    name: "Nomad Tumbler",
    href: "#",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-02.jpg",
    imageAlt:
      "Olive drab green insulated bottle with flared screw lid and flat top.",
    priceOptions: [
      { label: "Regular", price: "$35" },
      { label: "Gift Set", price: "$45" },
    ],
  },
  {
    id: 2,
    name: "Nomad Tumbler",
    href: "#",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-02.jpg",
    imageAlt:
      "Olive drab green insulated bottle with flared screw lid and flat top.",
    priceOptions: [
      { label: "Regular", price: "$35" },
      { label: "Gift Set", price: "$45" },
    ],
  },
  {
    id: 2,
    name: "Nomad Tumbler",
    href: "#",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-02.jpg",
    imageAlt:
      "Olive drab green insulated bottle with flared screw lid and flat top.",
    priceOptions: [
      { label: "Regular", price: "$35" },
      { label: "Gift Set", price: "$45" },
    ],
  },
  {
    id: 2,
    name: "Nomad Tumbler",
    href: "#",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-02.jpg",
    imageAlt:
      "Olive drab green insulated bottle with flared screw lid and flat top.",
    priceOptions: [
      { label: "Regular", price: "$35" },
      { label: "Gift Set", price: "$45" },
    ],
  },
  {
    id: 2,
    name: "Nomad Tumbler",
    href: "#",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-02.jpg",
    imageAlt:
      "Olive drab green insulated bottle with flared screw lid and flat top.",
    priceOptions: [
      { label: "Regular", price: "$35" },
      { label: "Gift Set", price: "$45" },
    ],
  },
  {
    id: 2,
    name: "Nomad Tumbler",
    href: "#",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-02.jpg",
    imageAlt:
      "Olive drab green insulated bottle with flared screw lid and flat top.",
    priceOptions: [
      { label: "Regular", price: "$35" },
      { label: "Gift Set", price: "$45" },
    ],
  },
];

export default function Grid() {
  return (
    <div className="bg-slate-100 border-radius">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div
          className="grid grid-cols-1 gap-x-6 gap-y-10 
                        sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
                        xl:gap-x-8"
        >
          {products.map((product) => (
            <div key={product.id} className="group">
              <a href={product.href}>
                <img
                  alt={product.imageAlt}
                  src={product.imageSrc}
                  loading="lazy"
                  className="aspect-square w-full rounded-lg 
                             bg-gray-200 object-cover group-hover:opacity-75 
                             xl:aspect-[7/8]"
                />
                <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              </a>

              {/* Display each quantity/price option */}
              <ul className="mt-1 space-y-1">
                {product.priceOptions.map(({ label, price }) => (
                  <li key={label} className="text-lg font-medium text-gray-900">
                    {label}: {price}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
