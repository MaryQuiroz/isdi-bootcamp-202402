import { Footer } from "flowbite-react";

export const FooterComponent = () => {
  return (
    <Footer >
      <div className="w-full text-center  bottom-0 ">
        
        <Footer.Divider />
        <Footer.Copyright href="#" by="Mary Quiroz™" year={new Date().getFullYear()} />
      </div>
    </Footer>
  );
}