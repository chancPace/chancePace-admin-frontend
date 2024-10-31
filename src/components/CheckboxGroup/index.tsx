import { Checkbox } from 'antd';
import { ReactNode } from 'react';
import { CheckboxGroupStyled } from './styled';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

interface CheckboxItem {
    value: string;
    children: ReactNode; // ReactNode 타입 사용
    checked: boolean;
}

interface CheckboxsGroupProps {
    checkboxes: { value: string; children: string; checked: boolean }[];
    onAllCheck: (e: CheckboxChangeEvent) => void;
    onSingleCheck: (e: CheckboxChangeEvent) => void;
    isAllChecked: boolean;
}

const CheckboxGroup = ({
    checkboxes,
    onAllCheck,
    onSingleCheck,
    isAllChecked,
}: CheckboxsGroupProps) => {
    return (
        <CheckboxGroupStyled>
            <Checkbox checked={isAllChecked} onChange={onAllCheck}>
                아래 약관에 모두 동의합니다
            </Checkbox>
            <div>
                {checkboxes.map((checkbox: CheckboxItem) => (
                    <div key={checkbox.value}>
                        <Checkbox
                            value={checkbox.value}
                            checked={checkbox.checked}
                            onChange={onSingleCheck}
                        >
                            {checkbox.children}
                        </Checkbox>
                    </div>
                ))}
            </div>
        </CheckboxGroupStyled>
    );
};

export default CheckboxGroup;
