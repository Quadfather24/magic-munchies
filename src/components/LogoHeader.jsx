import Logo from "../assets/images/logo/logo2.svg";

export default function LogoHeader() {
  return (
    <div className="hidden sm:flex absolute top-0 left-1 items-center space-x-[1px] z-50 pt-safe-top">
      <img src={Logo} alt="Magic Munchies" className="h-14 w--32" />
    </div>
  );
}
