import logo from "./logo.svg";
import { ActiveLink } from "raviger";

export default function Header(props: { title: string }) {
  return (
    <div className="flex gap-2 items-center">
      <img
        src={logo}
        className="animate-spin h-16 w-16"
        alt="logo"
        style={{
          animation: "spin 2s linear infinite"
        }}
      />
      <h1 className="text-center text-xl">{props.title}</h1>

      {[
        { name: "Home", path: "/" },
        { name: "Form", path: "/form" }
      ].map((item) => (
        <ActiveLink
          className="hover:bg-blue-200 px-2 rounded"
          href={item.path}
          exactActiveClass="text-blue-600"
        >
          {item.name}
        </ActiveLink>
      ))}
    </div>
  );
}
