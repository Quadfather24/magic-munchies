import Logo from "../assets/images/logo/vertical-logo.png";

export default function LogoHeader() {
  return (
    <div className="hidden sm:flex p-1 fixed top-0 items-center space-x-[1px] z-50 pt-safe-top">
      <span className="text-xs font-semibold">&copy;</span>
      <img src={Logo} alt="Magic Munchies" className="h-20 w-20" />
    </div>
  );
}
