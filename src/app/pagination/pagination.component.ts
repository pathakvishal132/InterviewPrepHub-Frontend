import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { PaginationService } from '../services/pagination.service';
import { DataCommunicationService } from '../services/data-communication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnInit, OnDestroy {

  switchedPage!: number;
  // subscription: Subscription;
  itemsLength!: number;
  pager: any = {};
  pagedItems!: any[];
  pagerInfo: any = {};
  @Input() type = 'default';
  @Input() page = 'default';

  constructor(private pagerService: PaginationService, private dataCommunicationService: DataCommunicationService) {
    // this.subscription = this.dataCommunicationService.totalRecords$.subscribe((pagerInfo: any) => {
    //   if (pagerInfo) {
    //     this.pagerInfo = pagerInfo;
    //     if (!this.pagerInfo.pageSize) {
    //       this.switchedPage = 1;
    //     }
    //     this.itemsLength = this.pagerInfo.totalItem;
    //     this.pager = this.pagerService.getPager(this.itemsLength, this.pager.currentPage, this.pagerInfo.pageSize);
    //   }
    // });
    // this.dataCommunicationService.resetPageRecords$.subscribe((pageInfo: any) => {
    //   this.pager = pageInfo;
    //   this.switchedPage = !pageInfo.currentPage ? 1 : pageInfo.currentPage;
    // });
  }

  ngOnInit() {
    this.switchedPage = 1;
  }

  setPage(page: number) {
    // // get pager object from service
    // this.switchedPage = page;
    // this.pager = this.pagerService.getPager(this.itemsLength, page, this.pagerInfo.pageSize);
    // if (this.page === 'digitalRisk') {
    //   this.dataCommunicationService.onDigitalPageChange(this.pager);
    // } else {
    //   this.dataCommunicationService.onPageChange(this.pager);
    // }
  }

  gotoPage(_page: any) {
    const page: number = Number.parseInt(_page, 10);
    if (page >= this.pager.totalPages) {
      this.switchedPage = this.pager.totalPages;
      this.setPage(this.pager.totalPages);
    } else if (page < 1) {
      this.switchedPage = 1;
      this.setPage(1);
    } else {
      this.setPage(page);
    }
  }

  itemViewd(pager: any): number {
    return (pager.currentPage - 1) * this.pagerInfo.pageSize + this.pagerInfo.listItems;
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    // this.subscription.unsubscribe();
  }

}
