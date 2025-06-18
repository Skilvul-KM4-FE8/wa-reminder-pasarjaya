import Link from "next/link";
// import nextvulWhite from "../public/nextvulWhite.svg";
import Image from "next/image";

// import your logo image file (e.g., logo.png or logo.svg) from the public directory
import logo from "../../../../public/logo.png"; // Adjust the filename and extension as necessary

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
