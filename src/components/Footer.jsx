export default function Footer() {
  return (
    <footer className="bg-white/10 backdrop-blur-md text-white py-6 px-6 mt-16 text-center">
      <h2 className="text-2xl font-bold mb-2">PayConnect</h2>
      <p className="text-white/70 text-sm">
        &copy; {new Date().getFullYear()} PayConnect. All rights reserved.
      </p>
    </footer>
  );
}
