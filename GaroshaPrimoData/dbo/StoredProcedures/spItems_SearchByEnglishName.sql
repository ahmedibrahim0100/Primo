CREATE PROCEDURE [dbo].[spItems_SearchByEnglishName]
	@identifier varchar(200)
as
Begin
set nocount on;

select * from dbo.ItemsMaster
where ItemsMaster.ItemNameEnglish = @identifier

END

