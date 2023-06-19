import Image from 'next/image'

const Illustration = () => (
    <div className="relative w-full h-48 aspect-w-10 aspect-h-7">
        <Image src="/covid.png" alt="Covid Illustration" fill />
    </div>
);

export default Illustration