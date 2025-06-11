import Link from "next/link";
// import nextvulWhite from "../public/nextvulWhite.svg";
import Image from "next/image";
import logo from "../../../public/logo.png";

export const HeaderLogo = () => {
  return (
    <>
      <Link href="/">
        <div className="items-center hidden lg:flex">
          <Image src={logo} alt="Pasarjaya Logo" width={50} />
        </div>
      </Link>
    </>
  );
};
