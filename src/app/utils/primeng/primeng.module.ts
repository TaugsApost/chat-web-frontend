import { NgModule } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { ToastModule } from 'primeng/toast';
import { MenubarModule, MenubarSub } from 'primeng/menubar';
import { PanelMenu, PanelMenuModule, PanelMenuSub } from 'primeng/panelmenu';
//import { ScrollingModule } from '@angular/cdk/scrolling';
import { MenuItemContent, MenuModule } from 'primeng/menu';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { FrozenColumn, TableModule } from 'primeng/table';
import { SpeedDialModule } from 'primeng/speeddial';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { FieldsetModule } from 'primeng/fieldset';
import { StepsModule } from 'primeng/steps';
import { TabViewModule } from 'primeng/tabview';
import { CheckboxModule } from 'primeng/checkbox';
import { OrderListModule } from 'primeng/orderlist';
import { TreeModule } from 'primeng/tree';
import { AccordionModule } from 'primeng/accordion';
import { InputTextModule } from 'primeng/inputtext';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { SidebarModule } from 'primeng/sidebar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { EditorModule } from 'primeng/editor';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { SliderModule } from 'primeng/slider';
import { InplaceModule } from 'primeng/inplace';
import { ScrollerModule } from 'primeng/scroller';
import { VirtualScrollerModule } from 'primeng/virtualscroller';


@NgModule({
  exports: [
    VirtualScrollerModule,
    InplaceModule,
    ScrollerModule,
    SliderModule,
    InputNumberModule,
    ConfirmDialogModule,
    EditorModule,
    InputSwitchModule,
    TieredMenuModule,
    SidebarModule,
    InputTextModule,
    TreeModule,
    OrderListModule,
    CheckboxModule,
    TabViewModule,
    StepsModule,
    DropdownModule,
    CalendarModule,
    ButtonModule,
    InputMaskModule,
    ToastModule,
    PanelMenuModule,
    MenuModule,
    MenubarModule,
    CardModule,
    DividerModule,
    TableModule,
    SpeedDialModule,
    DialogModule,
    TooltipModule,
    FieldsetModule,
    AccordionModule
  ],

})
export class PrimengModule { }
