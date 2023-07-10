import FileSaver from 'file-saver'

export async function downloadImage(_id , photo){
    FileSaver.saveAs(photo , `dalle-${_id}.jpg`)
}