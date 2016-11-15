declare module 'rc-datepicker' {
  interface DatePickerValue {
    value?: string;
    requestChange: Function;
  }

  interface IDatePickerProps {
    onChange: Function;
    onShow?: Function;
    onHide?: Function;
    value?: string;
    valueLink?: DatePickerValue;
    minDate?: string;
    maxDate?: string;
    locale?: string;
    startMode?: string;
    fixedMode?: boolean;
    displayFormat?: string;
    returnFormat?: string;
    showOnInputClick?: boolean;
    closeOnClickOutside?: boolean;
    showInputButton?: boolean;
    autoClose?: boolean;
    floating?: boolean;
    iconClassName?: string;
    className?: string;
    style?: any;
  }

  export const DatePicker: (props: IDatePickerProps) => JSX.Element;
}
