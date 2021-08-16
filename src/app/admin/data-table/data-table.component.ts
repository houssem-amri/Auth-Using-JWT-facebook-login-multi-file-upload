import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { UserService } from 'src/app/services/user.service';

export interface User {
  userName: String,
  email: String,
  pwd: String,
  role: String,


}
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  displayedColumns = ['userName', 'email', 'pwd', 'role'];
  dataSource;
  user;

  users: User[];
  searchText: string
  items = [];
  pageOfItems: Array<any>;
  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;
  @ViewChild(MatSort, { static: true })
  sort: MatSort;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getAllUsers()
  }
  getAllUsers() {
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data.users;
      this.dataSource = new MatTableDataSource(data.users);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }
}
