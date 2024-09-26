import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * 验证确认密码
 * @param controlNameToCompare
 * @returns
 */
export function validateConfirmPassword(controlNameToCompare: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.parent) {
      return null; // 如果不是表单的一部分，则不进行验证
    }
    const passwordControl = control.parent.get(controlNameToCompare);
    if (passwordControl && passwordControl.value !== control.value) {
      return { confirmPasswordMismatch: true };
    }
    return null;
  };
}

/**
 * 验证用户名
 * @param control
 * @returns
 */
export function validateUserName(control: AbstractControl): ValidationErrors | null {
  if (!/^[a-zA-Z][a-zA-Z0-9]*$/.test(control.value)) {
    return { userNameInvalid: true };
  }
  return null;
}

/**
 * 验证正则表达式
 * @param pattern
 * @param errorKey
 * @param errorMessage
 * @returns
 */
export function patternValidator(pattern: RegExp, errorKey: string, errorMessage: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null; // 如果控件值为空，不进行验证
    }
    const valid = pattern.test(control.value);
    return valid ? null : { [errorKey]: errorMessage };
  };
}

/**
 * 验证cron格式
 * @returns
 */
export function cronValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const cronExpression = control.value;
    if (!control.value) {
      return null; // 如果控件值为空，不进行验证
    }
    const cronParts = cronExpression.split(' ');
    // 仅检查标准 Unix/Linux 风格的 cron 表达式
    if (cronParts.length !== 5) {
      return { cronInvalid: true };
    }

    return null;
  };
}
