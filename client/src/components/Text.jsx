const Text = ({children, variant = 'body', as = 'p'}) => {
    const variants = {

        h1: "text-5xl font-bold text-gray-200 mb-4",
        h2: "text-2xl font-bold text-gray-200 mb-4",
        h3: "text-xl font-bold text-gray-200 mb-4",
   
        body: "text-gray-400 mb-6",
        bodyLarge: "text-lg text-gray-400 mb-6",
        bodySmall: "text-sm text-gray-400 mb-6",

        error: "text-red-200 bg-red-900/50 border border-red-800 rounded-lg p-4 mb-6 text-center",
        centered: "text-center text-gray-400 mb-4"
        
    }

    const Component = as;

    return (
        <Component className={variants[variant]}>
            {children}
        </Component>
    );
};

export default Text;

    