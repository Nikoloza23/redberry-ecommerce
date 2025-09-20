import { twMerge } from 'tailwind-merge';

const Logo = ({
    src = "/images/img_header_logo.png",
    alt = "RedSeam Clothing Logo",
    width = "180px",
    height = "24px",
    className,
    ...props
}) => {
    return (
        <img
            src={src}
            alt={alt}
            className={twMerge(
                'w-auto h-auto object-contain',
                className
            )}
            style={{
                width: width,
                height: height
            }}
            {...props}
        />
    );
};

export default Logo;