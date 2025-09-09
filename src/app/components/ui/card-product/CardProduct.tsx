import Image from "next/image";

interface CardProductProps {
    image: string;
    alt: string;
    title: string;
    description: string;
    className?: string;
}

const CardProduct = ({image, alt, title, description, className}: CardProductProps) => {  
    const classN = `w-[290px] flex flex-col items-center justify-start gap-[16px] p-[14.5px] lg:p-0 lg:w-[283px] ${className}`;
    return (
        <div className={classN}>
            <Image src={image} alt={alt} width={73} height={56}/>
            <h3 className="text-success font-bold text-lg">{title}</h3>
            <p className="text-neutral-grey3 font-regular text-md text-center">{description}</p>
        </div>
    );
}

export default CardProduct;