import { EnumLike } from "zod";
import removeUnderScore from "./removeUnderScore";

export default function getArrayFromEnum(enumValue: EnumLike) {
    return Object.entries(enumValue).map(([label, value]) => ({
        label: removeUnderScore(label),
        value: value.toString(),
    }));
}
