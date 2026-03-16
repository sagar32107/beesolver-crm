import '../styles/globals.css';

export const metadata = {
  title: 'BeeSolver CRM',
  description: 'Lead management and pipeline tracking',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
