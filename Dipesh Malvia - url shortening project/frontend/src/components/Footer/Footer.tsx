import * as React from 'react';

interface IFooterProps {
}

const Footer: React.FunctionComponent<IFooterProps> = () => {
  return (
    <>
        <footer className="bg-gray-800 text-white p-4">
            <div className="container mx-auto text-center">
                <p>&copy; 2025 Url Shortener. All rights reserved.</p>
                <p>Created with ❤️ by Ahanaf Tahmid</p>
            </div>
        </footer>
    </>
  );
};

export default Footer;
