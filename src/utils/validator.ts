export function validateParams(
  params: any[] = [],
  validators: any[] = [],
  errCallBack?: any
) {
  // validate params
  try {
    for (let i = 0; i < validators.length; i++) {
      if (!validators[i]) {
        throw new Error(`validator ${i} not found!`);
      }

      const err = validators[i](params, i);
      if (err) {
        throw new Error(err.message);
      }
    }
  } catch (error: any) {
    if (errCallBack != null) {
      errCallBack(error);
    }
    throw new Error(error.message);
  }
}

export function funcParamsCheck(
  method: (args: any[] | any) => any | Promise<any>,
  requiredParamsCount: number,
  validators: any[] = [],
  errCallBack?: any
): any {
  return async function (...params: any): Promise<any> {
    // validate params
    try {
      if (params.length < requiredParamsCount) {
        throw new Error(`missing value for required argument ${params.length}`);
      }

      for (let i = 0; i < validators.length; i++) {
        if (!validators[i]) {
          throw new Error(`validator ${i} not found!`);
        }

        const err = validators[i](params, i);
        if (err) {
          throw new Error(err.message);
        }
      }
    } catch (error: any) {
      if (errCallBack != null) {
        return errCallBack(error);
      }
      throw new Error(error.message);
    }

    // pass validator, execute the method
    console.log(params);
    return await method.apply(null, params);
  };
}

export const validators = {
  /**
   * hex validator to ensure has "0x" prefix
   * @param {any[]} params parameters of method
   * @param {number} index index of parameter
   */

  /**
   * hex string validator
   * @param {any[]} params parameters of method
   * @param {number} index index of parameter
   */
  hexString(params: any[], index: number): any {
    return verifyHexString(params[index], index);
  },

  hexNumber(params: any[], index: number): any {
    return verifyHexNumber(params[index], index);
  },

  storageKey(params: any[], index: number): any {
    return verifyStorageKey(params[index], index);
  },

  /**
   * hex validator to validate block hash
   * @param {any[]} params parameters of method
   * @param {number} index index of parameter
   */
  blockHash(params: any[], index: number): any {
    if (typeof params[index] !== "string") {
      return invalidParamsError(index, `argument must be a hex string`);
    }

    const blockHash = params[index].substring(2);

    if (!/^[0-9a-fA-F]+$/.test(blockHash) || blockHash.length !== 64) {
      return invalidParamsError(index, `invalid block hash`);
    }

    return undefined;
  },

  /**
   * hex validator to validate transaction hash
   * @param {any[]} params parameters of method
   * @param {number} index index of parameter
   */
  txHash(params: any[], index: number): any {
    if (typeof params[index] !== "string") {
      return invalidParamsError(index, `argument must be a hex string`);
    }

    const txHash = params[index].substring(2);

    if (!/^[0-9a-fA-F]+$/.test(txHash) || txHash.length !== 64) {
      return invalidParamsError(index, `invalid transaction hash`);
    }

    return undefined;
  },

  /**
   * hex validator to validate block hash
   * @param {any[]} params parameters of method
   * @param {number} index index of parameter
   */
  address(params: any[], index: number): any {
    return verifyAddress(params[index], index);
  },

  ckbPrivateKey(params: any[], index: number): any {
    return verifyCkbPrivateKey(params[index], index);
  },

  ckbToSignMessage(params: any[], index: number): any {
    return verifyCkbToSignMessage(params[index], index);
  },

  /**
   * bool validator to check if type is boolean
   * @param {any[]} params parameters of method
   * @param {number} index index of parameter
   */
  bool(params: any[], index: number): any {
    if (typeof params[index] !== "boolean") {
      return invalidParamsError(index, `argument is not boolean`);
    }
    return undefined;
  },

  number(params: any[], index: number): any {
    if (typeof params[index] !== "number") {
      return invalidParamsError(index, `argument is not number`);
    }
    return undefined;
  },

  positiveNumber(params: any[], index: number): any {
    if (typeof params[index] !== "number") {
      return invalidParamsError(index, `argument is not number`);
    }
    if (params[index] < 0) {
      return invalidParamsError(index, `argument is not positive number(<0)`);
    }
    return undefined;
  },

  decimalNumberString(params: any[], index: number): any {
    if (typeof params[index] !== "string") {
      return invalidParamsError(index, `argument is not string`);
    }
    if (params[index].startsWith("0x")) {
      return invalidParamsError(index, `argument start with 0x is not decimal`);
    }
    if (isNaN(params[index])) {
      return invalidParamsError(index, `argument is not number`);
    }
    return undefined;
  },

  decimalPositiveIntegerString(params: any[], index: number): any {
    const err = validators.decimalNumberString(params, index);
    if (err) {
      return err;
    }

    if (params[index].includes("-")) {
      return invalidParamsError(index, `illegal token - in Positive Integer!`);
    }
    if (params[index].includes(".")) {
      return invalidParamsError(index, `illegal token . in Positive Integer!`);
    }
    if (+params[index] <= 0) {
      return invalidParamsError(index, `argument is not positive Integer(<=0)`);
    }
    return undefined;
  },
};

function verifyAddress(address: any, index: number): any {
  if (typeof address !== "string") {
    return invalidParamsError(index, `argument must be a hex string`);
  }

  if (!validateAddress(address)) {
    return invalidParamsError(
      index,
      `address must be a 20 bytes-length hex string`
    );
  }

  return undefined;
}

function verifyCkbPrivateKey(pk: any, index: number): any {
  if (typeof pk !== "string") {
    return invalidParamsError(index, `argument must be a hex string`);
  }
  if (!validateCkbPrivateKey(pk)) {
    return invalidParamsError(
      index,
      `privateKey must be a 32 bytes-length hex string`
    );
  }

  return undefined;
}

function verifyCkbToSignMessage(msg: any, index: number): any {
  if (typeof msg !== "string") {
    return invalidParamsError(index, `argument must be a hex string`);
  }
  if (!validateCkbToSignMessage(msg)) {
    return invalidParamsError(
      index,
      `message must be a 32 bytes-length hex string`
    );
  }

  return undefined;
}

function verifyHexNumber(hexNumber: string, index: number) {
  if (typeof hexNumber !== "string") {
    return invalidParamsError(index, `argument must be a hex string`);
  }

  if (!hexNumber.startsWith("0x")) {
    return invalidParamsError(index, `hex string without 0x prefix`);
  }

  if (hexNumber.startsWith("0x0") && hexNumber !== "0x0") {
    return invalidParamsError(index, `hex number with leading zero digits`);
  }

  if (!validateHexNumber(hexNumber)) {
    return invalidParamsError(index, `invalid hex number`);
  }

  return undefined;
}

function verifyStorageKey(key: string, index: number) {
  if (typeof key !== "string") {
    return invalidParamsError(index, `argument must be a hex string`);
  }

  if (!key.startsWith("0x")) {
    return invalidParamsError(index, `hex string without 0x prefix`);
  }

  if (!/^0x([0-9a-fA-F]*)$/.test(key)) {
    return invalidParamsError(index, `invalid hex`);
  }

  return undefined;
}

function verifyHexString(hexString: any, index: number): any {
  if (typeof hexString !== "string") {
    return invalidParamsError(index, `argument must be a hex string`);
  }

  if (!hexString.startsWith("0x")) {
    return invalidParamsError(index, `hex string without 0x prefix`);
  }

  if (hexString === "0x") {
    return invalidParamsError(index, `invalid hex string 0x`);
  }

  if (hexString.length % 2 !== 0) {
    return invalidParamsError(
      index,
      `Hex input string must have an even length`
    );
  }

  if (!validateHexString(hexString)) {
    return invalidParamsError(index, `invalid hex string`);
  }

  return undefined;
}

function validateAddress(address: string): boolean {
  return /^0x[0-9a-fA-F]+$/.test(address) && address.length === 42;
}

function validateCkbPrivateKey(key: string): boolean {
  return /^0x[0-9a-fA-F]+$/.test(key) && key.length === 66;
}

function validateCkbToSignMessage(key: string): boolean {
  return /^0x[0-9a-fA-F]+$/.test(key) && key.length === 66;
}

function invalidParamsError(index: number, message: string) {
  return new Error(`[ParamsValidator] invalid argument ${index}: ${message}`);
}

export function validateHexString(hex: string): boolean {
  return /^0x([0-9a-fA-F][0-9a-fA-F])*$/.test(hex);
}

export function validateHexNumber(hex: string): boolean {
  return /^0x(0|[0-9a-fA-F]+)$/.test(hex);
}
