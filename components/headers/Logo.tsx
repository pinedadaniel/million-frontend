import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
      <div
          className="logo loading__fade fade-in"
          data-duration="1.2"
          data-delay="300"
      >
        <Link href="/"  className="logo__link">
            <div className="mxd-background" style={{width:'40px'}}>
                <Image
                    alt="logo"
                    src="/img/logo.png"
                    width={24}
                    height={24}
                />
            </div>
          <span className="logo-text">MILLION</span>
        </Link>
      </div>
  );
}
