// todo: ここに単体テストを書いてみましょう！
import { sumOfArray, asyncSumOfArray, asyncSumOfArraySometimesZero, getFirstNameThrowIfLong } from "../functions";
import { NameApiService } from "../nameApiService";
import { DatabaseMock } from "../util/index";

jest.mock("../util/index");
jest.mock("../nameApiService");

const DatabaseMockMock = DatabaseMock as jest.Mock;
const NameApiServiceMock = NameApiService as jest.Mock;


describe('sumOfArray OK', () => {
  test('1+1=2', () => {
    expect(sumOfArray([1,1])).toBe(2);
  });
});
// Failedになる
// describe('sumOfArray empty NG', () => {
//   test('empty', () => {
//     expect(sumOfArray([])).toThrow('NGです');
//   });
// });

// エラーで落ちる
// describe('sumOfArray strinh NG', () => {
//   test('string', () => {
//     expect(sumOfArray(["abc"])).toThrow();
//   });
// });

describe('asyncSumOfArray OK', () => {
  test('1+1=2', () => {
    return asyncSumOfArray([1,1]).then(data => {
      expect(data).toBe(2);
    });
  });
});

describe('asyncSumOfArraySometimesZero OK', () => {
  test('hoge', () => {
    const databaseMock = new DatabaseMock();
    expect(DatabaseMockMock).toHaveBeenCalled();
    return asyncSumOfArraySometimesZero([1,1], databaseMock).then(data => {
      expect(data).toBe(2);
    });
  });
});

describe('asyncSumOfArraySometimesZero error', () => {
  test('hoge', () => {
    const databaseMock = new DatabaseMock();
    expect(DatabaseMockMock).toHaveBeenCalled();
    return asyncSumOfArraySometimesZero([], databaseMock).then(data => {
      expect(data).toBe(0);
    });
  });
});

describe('getFirstNameThrowIfLong', () => {
  test('OK', async () => {
    const nameApiSerivceMock = new NameApiService();
    //getFirstNameに名前を入れてgetFirstNameThrowIfLongを実行したい。。。
    nameApiSerivceMock.getFirstName = ()  => {
      // 実際はDBやAPIを使う複雑なもの
      // promise.then((res) => {
        return Promise.resolve('aaa');
      // });
    }
    console.log(nameApiSerivceMock.getFirstName());
    return getFirstNameThrowIfLong(10, nameApiSerivceMock).then(data => {
      expect(data).toBe('aaa');
    });
    expect(NameApiServiceMock).toHaveBeenCalled();
  });

  test('LONGER', async () => {
    const nameApiSerivceMock = new NameApiService();
    nameApiSerivceMock.getFirstName = ()  => {
      return Promise.resolve('aaa');
    }
    console.log(nameApiSerivceMock.getFirstName());
    expect(getFirstNameThrowIfLong(2, nameApiSerivceMock)).rejects.toEqual(new Error('first_name too long'));
  });
});





//以下雑メモ
describe('getFirstNameThrowIfLong OK', () => {
  // test('hoge', async () => {
  // await expect(repeat('go', 5))
  //   .resolves
  //   .toBe('gogogogogo');
  // });

  test('OK', async () => {
    const nameApiSerivceMock = new NameApiService();
    //expect(NameApiServiceMock).toHaveBeenCalled();
    // return getFirstNameThrowIfLong(4, nameApiSerivceMock).then(data => {
    //   expect(data).toBe("aaa");
    // });
    // nameApiSerivceMock((): any => {
    //     return {
    //       getFirstName: (): string => {
    //         return 'aaa'
    //       }
    //     }
    // })
    // async nameApiSerivceMock.getFirstName(): Promise<string> {
    //   return 'foo';
    // }
    // nameApiSerivceMock.getFirstName: string => {
    //   return 'aaa'
    // }


    // console.log(nameApiSerivceMock.getFirstName());
    // return getFirstNameThrowIfLong(10, nameApiSerivceMock).then(data => {
    //   expect(data).toBe('aaa');
    // });
    // expect(NameApiServiceMock).toHaveBeenCalled();
    //expect(nameApiSerivceMock.getFirstName).toBe('aaa');
    //expect(getFirstNameThrowIfLong(4, nameApiSerivceMock)).toBe('aaa');
  });
  // test('LONGER', async () => {
    // return getFirstNameThrowIfLong(2, nameApiSerivceMock).then(data => {
    //   // expect(data).toThrow("first_name too long");
    //   expect(data).rejects.toEqual(new Error('first_name too long'));
    // });
  // });
});
