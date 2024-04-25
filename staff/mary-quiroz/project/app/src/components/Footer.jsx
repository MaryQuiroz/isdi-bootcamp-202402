import { Footer } from "flowbite-react";

export const FooterComponent = () => {
  return (
    <Footer container>
      <div className="w-full text-center fixed bottom-0 ">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <Footer.Brand
            href="https://flowbite.com"
            src="/favicon.png"
            alt="Pet&App"
            name="Pet&App"
          />
          <Footer.LinkGroup>
            <Footer.Link href="#">About</Footer.Link>
            <Footer.Link href="#">Privacy Policy</Footer.Link>
            <Footer.Link href="#">Licensing</Footer.Link>
            <Footer.Link href="#">Contact</Footer.Link>
          </Footer.LinkGroup>
        </div>
        <Footer.Divider />
        <Footer.Copyright href="#" by="Mary Quiroz™" year={new Date().getFullYear()} />
      </div>
    </Footer>
  );
}