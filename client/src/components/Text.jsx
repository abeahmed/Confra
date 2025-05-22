const Text = ({children, variant = 'body', as = 'p', className=''}) => {
    const variants = {

        h1: "text-3xl md:text-4xl font-semibold text-gray-100 mb-4 md:mb-6 tracking-tight leading-tight",
        h2: "text-2xl md:text-3xl font-semibold text-gray-100 mb-4 md:mb-6 tracking-tight leading-tight",
        h3: "text-xl md:text-2xl font-semibold text-gray-200 mb-3 md:mb-4 tracking-tight leading-tight",
        h4: "text-lg md:text-xl font-semibold text-gray-200 mb-3 md:mb-4",
   
        body: "text-base md:text-lg text-gray-300 leading-relaxed mb-4 md:mb-6",
        bodyLarge: "text-lg md:text-xl text-gray-300 leading-relaxed mb-4 md:mb-6",
        bodySmall: "text-sm md:text-base text-gray-400 leading-relaxed mb-3 md:mb-4",

        centered: "text-center text-gray-400 mb-3 md:mb-4"
        
    }

    const Component = as;

    return (
        <Component className={`${variants[variant]} ${className}`}>
            {children}
        </Component>
    );
};

export default Text;

    