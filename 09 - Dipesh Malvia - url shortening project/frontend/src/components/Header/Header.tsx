import * as React from 'react';

interface IHeaderProps {
}

const Header: React.FunctionComponent<IHeaderProps> = () => {
  return (
    <>
        <header className="bg-blue-500 text-white p-4">
            <h1 className="text-2xl">Url Shortener</h1>
        </header>
    </>
  );
};

export default Header;
