import { getProjectConfigurationType } from './getProjectConfigurationType';
import { CProjectType } from '@/types';

describe('getProjectConfigurationType', () => {
    it('should return "library" for CProjectType.Lib', () => {
        const type = CProjectType.Lib;
        const result = getProjectConfigurationType(type);
        expect(result).toEqual('library');
    });

    it('should return "application" for CProjectType.App', () => {
        const type = CProjectType.App;
        const result = getProjectConfigurationType(type);
        expect(result).toEqual('application');
    });

    it('should return "application" for CProjectType.Test', () => {
        const type = CProjectType.Test;
        const result = getProjectConfigurationType(type);
        expect(result).toEqual('application');
    });
});
