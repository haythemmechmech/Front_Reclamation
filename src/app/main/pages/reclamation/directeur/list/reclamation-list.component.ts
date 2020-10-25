import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatDialogRef } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { takeUntil } from 'rxjs/internal/operators';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { ReclamationDirecteurListService } from './reclamation-list.service';
import { Router } from '@angular/router';
import { Reclamation } from 'app/model/reclamation.model';
import { Nm_Etat } from 'app/model/etat.model';

@Component({
    selector     : 'reclamation-user-list',
    templateUrl  : './reclamation-list.component.html',
    styleUrls    : ['./reclamation-list.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class ReclamationDirecteurListComponent implements OnInit
{

   
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    dataSource: FilesDataSource | null;
    displayedColumns = ['id', 'titre', 'description','type','etat','phase','created_at','updated_at','created_by','affected_to','buttons'];

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild(MatSort)
    sort: MatSort;

    @ViewChild('filter')
    filter: ElementRef;

    recla:Reclamation;
    etats:Nm_Etat[] = [];
    etatTmp : Nm_Etat;
   
    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(public _matDialog: MatDialog,
        private router: Router,
        private _reclamationdirecteurlistService: ReclamationDirecteurListService
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {

        this._reclamationdirecteurlistService.getEtatById('3351')
        .subscribe( (data:any)=>{

         this.etatTmp=data;
         
          this.etats.push(this.etatTmp);

        
                    }
            );     


        this.dataSource = new FilesDataSource(this._reclamationdirecteurlistService, this.paginator, this.sort);
console.log(this.dataSource);
        fromEvent(this.filter.nativeElement, 'keyup')
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if ( !this.dataSource )
                {
                    return;
                }

                this.dataSource.filter = this.filter.nativeElement.value;
            });
    }


    deleteReclamation(reclamation): void
    {
console.log(reclamation);
        
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
       
        this.confirmDialogRef.afterClosed().subscribe(result => {
            if ( result )
            {
                this._reclamationdirecteurlistService.deleteReclamation(reclamation);
            }
            this.confirmDialogRef = null;
        });
       

    }


    affecter(reclamation): void
    {


        this._reclamationdirecteurlistService.affecter(reclamation);


        this.router.navigate(['/pages/Affectation']);

    }


    refuser(reclamation): void
    {


        this._reclamationdirecteurlistService.refuser(reclamation);

        this.recla=this._reclamationdirecteurlistService.rec;
        console.log(this.recla)
       this.recla.nm_Etats=this.etats;

        this._reclamationdirecteurlistService.saveReclamation(this.recla)
            .then(() => {

                // Trigger the subscription with new data
                this._reclamationdirecteurlistService.onReclamationsChanged.next(this.recla);

                // Show the success message
               

                this.router.navigate(['/pages/ReclamationDirecteur']);
            });



    }
  




       

    

   

}

export class FilesDataSource extends DataSource<any>
{
    private _filterChange = new BehaviorSubject('');
    private _filteredDataChange = new BehaviorSubject('');

    /**
     * Constructor
     *
     * @param {ReclamationDirecteurListService} _reclamationdirecteurlistService
     * @param {MatPaginator} _matPaginator
     * @param {MatSort} _matSort
     */
    constructor(
        private _reclamationdirecteurlistService: ReclamationDirecteurListService,
        private _matPaginator: MatPaginator,
        private _matSort: MatSort
    )
    {
        super();

        this.filteredData = this._reclamationdirecteurlistService.reclamations;
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]>
    {
        const displayDataChanges = [
            this._reclamationdirecteurlistService.onReclamationsChanged,
            this._matPaginator.page,
            this._filterChange,
            this._matSort.sortChange
        ];

        return merge(...displayDataChanges)
            .pipe(
                map(() => {
                        let data = this._reclamationdirecteurlistService.reclamations.slice();

                        data = this.filterData(data);

                        this.filteredData = [...data];

                        data = this.sortData(data);

                        // Grab the page's slice of data.
                        const startIndex = this._matPaginator.pageIndex * this._matPaginator.pageSize;
                        return data.splice(startIndex, this._matPaginator.pageSize);
                    }
                ));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    // Filtered data
    get filteredData(): any
    {
        return this._filteredDataChange.value;
    }

    set filteredData(value: any)
    {
        this._filteredDataChange.next(value);
    }

    // Filter
    get filter(): string
    {
        return this._filterChange.value;
    }

    set filter(filter: string)
    {
        this._filterChange.next(filter);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Filter data
     *
     * @param data
     * @returns {any}
     */
    filterData(data): any
    { 
        if ( !this.filter )
        {
            return data;
        }
        return FuseUtils.filterArrayByString(data, this.filter);
    }

    /**
     * Sort data
     *
     * @param data
     * @returns {any[]}
     */
    sortData(data): any[]
    { 
        if ( !this._matSort.active || this._matSort.direction === '' )
        {
            return data;
        }

        return data.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';

            switch ( this._matSort.active )
            {
                case 'id':
                    [propertyA, propertyB] = [a.id, b.id];
                    break;
                case 'titre':
                    [propertyA, propertyB] = [a.titre, b.titre];
                    break;
                case 'description':
                    [propertyA, propertyB] = [a.description, b.description];
                    break;
                case 'created_at':
                    [propertyA, propertyB] = [a.created_at, b.created_at];
                    break;
               
               
            }

            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

            return (valueA < valueB ? -1 : 1) * (this._matSort.direction === 'asc' ? 1 : -1);
        });
    }

    /**
     * Disconnect
     */
    disconnect(): void
    {
    }

    

}
