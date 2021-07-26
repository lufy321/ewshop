import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css';
import { SwipeCell } from 'vant';
import {List} from "vant";
import { PullRefresh } from 'vant';
import { Cell, CellGroup } from 'vant';
import { Swipe, SwipeItem } from 'vant';
import { Lazyload } from 'vant';
import { Tab, Tabs } from 'vant';
import { ConfigProvider } from 'vant';
import { Image as VanImage } from 'vant';
import { Toast } from 'vant';
import { Card } from 'vant';
import { Tag } from 'vant';
import { Button } from "vant";
import { Skeleton } from 'vant';
import { Empty } from 'vant';
import { Collapse, CollapseItem } from 'vant';
import { Sidebar, SidebarItem } from 'vant';
import { Sticky } from 'vant';
import { Form, Field } from 'vant';
import { Notify } from "vant";
import { Badge } from 'vant';
import { Checkbox, CheckboxGroup } from 'vant';
import { Stepper } from 'vant';
import { SubmitBar } from 'vant';
import { Icon } from 'vant';
import { AddressEdit } from 'vant';
import { AddressList } from 'vant';
import { Grid, GridItem } from 'vant';
import { Popup } from 'vant';

createApp(App)
    .use(store)
    .use(SubmitBar)
    .use(Popup)
    .use(AddressList)
    .use(AddressEdit)
    .use(router)
    .use(Grid)
    .use(GridItem)
    .use(Icon)
    .use(Notify)
    .use(Stepper)
    .use(Badge)
    .use(SwipeCell)
    .use(List)
    .use(Checkbox)
    .use(CheckboxGroup)
    .use(Form)
    .use(Field)
    .use(PullRefresh)
    .use(Cell)
    .use(CellGroup)
    .use(Swipe)
    .use(SwipeItem)
    .use(Sticky)
    .use(Tab)
    .use(Tabs)
    .use(Sidebar)
    .use(SidebarItem)
    .use(CollapseItem)
    .use(Toast)
    .use(ConfigProvider)
    .use(VanImage)
    .use(Card)
    .use(Tag)
    .use(Skeleton)
    .use(Button)
    .use(Empty)
    .use(Collapse)
    .use(Lazyload,{loading: require('assets/images/default.png'),error: require('assets/images/default.png')})
    .mount('#app')
