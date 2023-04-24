import React from "react";
import { SizeType } from "@/shared/types";

import './Title.scss';

type Props = {
    size: SizeType;
    children: string;
}

export const Title = ({size: type, children}: Props) => {
    return <div className={`title title--${type.toLowerCase()}`}>{children}</div>
}