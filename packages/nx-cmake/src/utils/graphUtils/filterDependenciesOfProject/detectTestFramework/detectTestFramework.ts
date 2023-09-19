import { messageIncludesCmocka } from '../messageIncludesCmocka/messageIncludesCmocka';
import { messageIncludesGtest } from '../messageIncludesGtest/messageIncludesGtest';

export const detectTestFramework = (message: string) => {
    const includesGtest = messageIncludesGtest(message);
    const includesCmocka = messageIncludesCmocka(message);
    return includesGtest || includesCmocka;
};
