import ProfileMenu from "./ProfileMenu";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center relative">
      {/* Top Right Profile Menu */}
      <div className="absolute top-6 right-6 z-50">
        <ProfileMenu />
      </div>

      <div className="w-full max-w-3xl px-6 pt-24">
        {children}
      </div>
    </div>
  );
}
