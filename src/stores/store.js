import {MobXProviderContext} from "mobx-react";
import React from 'react';

export const useStores = () => React.useContext(MobXProviderContext);