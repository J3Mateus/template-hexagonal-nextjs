import React, { useState } from "react";
import { Input } from 'antd';

const { TextArea } = Input;
type Event = React.ChangeEvent<HTMLInputElement>;

interface CpfCnpjProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>, mask: string) => void;
    type: string;
}

const CpfCnpj: React.FC<CpfCnpjProps> = (props) => {
    const { onChange, type } = props;
    const [cpfCnpj, setCpfCnpj] = useState<string>(clear(props.value));

    const TYPES = {
        CPF: "999.999.999-999",
        CNPJ: "99.999.999/9999-99",
    };
    const MAX_LENGTH = clear(TYPES.CNPJ).length;

    function getMask(value: string) {
        return value.length > 11 ? "CNPJ" : "CPF";
    }

    function clear(value: string) {
        return value && value.replace(/[^0-9]/g, "");
    }

    function applyMask(value: string, mask: string) {
        let result = "";

        let inc = 0;
        Array.from(value).forEach((letter, index) => {
          if (!mask[index + inc].match(/[0-9]/)) {
            result += mask[index + inc];
            inc++;
          }
          result += letter;
        });
        return result;
    }

    function onLocalChange(ev: Event) {
        let value = clear(ev.target.value);
        const mask = getMask(value);

        let nextLength = value.length;

        if (nextLength > MAX_LENGTH) return;

        value = applyMask(value, TYPES[mask]);
        setCpfCnpj(value)

        onChange(ev, mask);
    }

    return (
    <Input {...props} value={cpfCnpj} onChange={onLocalChange} />
    );
}

export default CpfCnpj;