import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'app/core/services';
import { BehaviorSubject } from 'rxjs';
import { auditTime } from 'rxjs/operators';

@Component({
    selector: 'app-document-lister',
    templateUrl: './document-lister.component.html',
    styleUrls: ['./document-lister.component.scss']
})
export class DocumentListerComponent implements OnInit {

    constructor(private electronService: ElectronService) { }

    isElectron: boolean

    structure: any = {
        totalSize: 0,
        open: true,
        files: [],
        folders: []
    }
    structure$: BehaviorSubject<any> = new BehaviorSubject({})

    ngOnInit(): void {
        if (this.electronService.isElectron) {
            this.isElectron = true
            this.startDigging('tmp/projects/P8018')
            this.structure$.pipe(auditTime(500)).subscribe((res) => {
                console.log(res);
                this.buildStructure(res)
            })
        }

    }

    buildStructure(structure: any) {
        Object.keys(structure).forEach((key) => {
            console.log(key)
            const o = structure[key]
            if (o.type === 'folder') {
                console.log(Object.keys(o.files))
                Object.keys(o.files).forEach((k) => {
                    console.log(k)
                })
            }
        })
    }

    sizeParser(size:number) {

        if (!size) {
            return 'Calculating...'
        }

        else if (size > 10000000) {
          return (size / 1000000000).toFixed(1) + 'GB'
        }
    
        else if (size > 1000000) {
          return (size / 1000000).toFixed(1) + 'MB'
        }
    
        else {
          return (size / 1000).toFixed(0) + 'K'
        } 
    }

    async startDigging(moveFrom) {
        // Our starting point
        try {
            // Get the files as an array
            const files = await this.electronService.fs.promises.readdir(moveFrom);

            // Loop them all with the new for...of
            for (const file of files) {
                // Get the full paths
                const fromPath = this.electronService.path.join(moveFrom, file);

                // Stat the file to see if we have a file or dir
                const stat = await this.electronService.fs.promises.stat(fromPath);

                if (stat.isFile()) {
                    // console.log("'%s' is a file.", fromPath);
                    if (file === '.DS_Store') {
                        // console.log('removing ds_store')
                    } else {
                        this.structure.totalSize = this.structure.totalSize + stat.size
                        this.structure.files.push({
                            name: file,
                            type: 'file',
                            size: stat.size,
                            modified: stat.mtime,
                            created: stat.birthtime,
                            extension: this.electronService.path.extname(fromPath),
                            path: fromPath
                        })
                    }


                }
                else if (stat.isDirectory()) {
                    // console.log("'%s' is a directory.", fromPath);
                    this.structure.folders.push({
                        name: file,
                        type: 'folder',
                        path: fromPath,
                        files: [],
                        folders: [],
                        open: false
                    })
                    let i = this.structure.folders.length - 1
                    let parent = this.structure.folders[i]
                    //  console.log(parent)
                    this.digDeeper(fromPath, parent)
                }





                // Now move async
                //await fs.promises.rename( fromPath, toPath );

                // Log because we're crazy
                //console.log( "Moved '%s'->'%s'", fromPath, toPath );
            } // End for...of
            this.structure$.next(this.structure)
        }
        catch (e) {
            // Catch anything bad that happens
            console.error("We've thrown! Whoops!", e);
        }

    }; // Wrap in parenthesis and call now

    async digDeeper(p, par) {
        // console.log(par)
        try {
            // Get the files as an array
            const files = await this.electronService.fs.promises.readdir(p);

            // Loop them all with the new for...of
            for (const file of files) {
                // Get the full paths
                const fromPath = this.electronService.path.join(p, file);

                // Stat the file to see if we have a file or dir
                const stat = await this.electronService.fs.promises.stat(fromPath);

                if (stat.isFile()) {
                    // console.log("'%s' is a file.", fromPath);
                    // console.log(file)
                    if (file === '.DS_Store') {
                        // console.log('removing ds_store')
                    } else {
                        this.structure.totalSize = this.structure.totalSize + stat.size
                        par.files.push({
                            name: file,
                            type: 'file',
                            size: stat.size,
                            modified: stat.mtime,
                            created: stat.birthtime,
                            extension: this.electronService.path.extname(fromPath),
                            path: fromPath
                        })
                    }
                }

                else if (stat.isDirectory()) {
                    // console.log("'%s' is a directory.", fromPath);
                    // console.log(file)
                    par.folders.push({
                        name: file,
                        type: 'folder',
                        path: fromPath,
                        files: [],
                        folders: [],
                        open: false
                    })

                    let i = par.folders.length - 1
                    let parent = par.folders[i]

                    this.digDeeper(fromPath, parent)
                }



                // Now move async
                //await fs.promises.rename( fromPath, toPath );

                // Log because we're crazy
                //console.log( "Moved '%s'->'%s'", fromPath, toPath );
            } // End for...of
            this.structure$.next(this.structure)

        }
        catch (e) {
            // Catch anything bad that happens
            console.error("We've thrown! Whoops!", e);
        }
    }


}
