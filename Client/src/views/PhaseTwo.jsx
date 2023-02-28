import React from "react";
import { Link } from "react-router-dom";

export default function PhaseTwo() {
    return (
        <section className="w-screen h-screen bg-[#312E2B] flex flex-col  justify-center items-center text-white">
            <div className="w-fit flex flex-col gap-[60px] justify-center items-center">
                <h1 className="text-[70px]">Phase Two</h1>
                <div className="flex items-center justify-between w-full ">
                    <Link to={'/guide'}>
                        <img src="./bilder/arrow.png" alt="<-" className="text-[50px] w-[50] h-[50px]"/>
                    </Link>
                    <Link to={'/phaseOne'}>
                        <h1 className="text-[28px]">Prev</h1>
                    </Link>
                </div>
                <div className="flex justify-center gap-4 ">
                    <img src="../bilder/NoIcon.png" alt="img not found" />
                    <p className="max-w-[500px]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Morbi consectetur urna vestibulum nulla porta, placerat
                        lobortis mi egestas. Curabitur viverra, elit vitae sagittis
                        sagittis, est leo faucibus arcu, nec auctor lectus turpis
                        nec sem. Donec ac lectus ut lorem sodales sollicitudin in at
                        lectus. Nunc luctus ullamcorper augue ut semper. Vivamus vel
                        arcu vel est lacinia cursus. Nulla feugiat accumsan
                        pulvinar. Donec sed ultricies elit. Vivamus viverra in erat
                        tristique bibendum. Nunc sed gravida massa. Orci varius
                        natoque penatibus et magnis dis parturient montes, nascetur
                        ridiculus mus. Aliquam in lacus vitae risus mollis maximus.
                        Integer dignissim sollicitudin maximus. Integer ultricies
                        sit amet ante sit amet finibus. Aliquam mollis faucibus
                        euismod. Suspendisse feugiat felis justo, eget imperdiet
                        nibh finibus at. Maecenas placerat in nisl a rhoncus. Morbi
                        nulla urna, viverra quis dui ut, auctor tempor nisi. Integer
                        lobortis, risus ac tincidunt feugiat, mauris sapien commodo
                        nibh, vel euismod mauris eros eu justo. Curabitur varius
                        blandit libero, non posuere risus facilisis congue.
                        Phasellus odio ante, posuere sit amet volutpat non, pharetra
                        ac lectus. Phasellus faucibus ante id convallis cursus.
                        Nullam eros tortor, facilisis ut finibus non, accumsan ac
                        orci.
                    </p>
                </div>
            </div>
        </section>
    );
    
}