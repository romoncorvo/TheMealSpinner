using AutoMapper;
using TheMealSpinner.Api.Models;
using TheMealSpinner.Api.Models.DTOs;

namespace TheMealSpinner.Api.Services;

public class MapperProfile : Profile
{
    public MapperProfile()
    {
        CreateMap<RecipeTransfer, Recipe>()
            .ForMember(d => d.Ingredients, opt => opt.ConvertUsing(new StringConverter()))
            .ForMember(d => d.Instructions, opt => opt.ConvertUsing(new InstructionStringConverter()))
            .ForMember(d => d.Times, opt => opt.ConvertUsing(new StringConverter()));
        
        CreateMap<Recipe, RecipeTransfer>()
            .ForMember(d => d.Ingredients, opt => opt.ConvertUsing(new ListConverter()))
            .ForMember(d => d.Instructions, opt => opt.ConvertUsing(new InstructionListConverter()))
            .ForMember(d => d.Times, opt => opt.ConvertUsing(new ListConverter()));
    }
    
    private class StringConverter : IValueConverter<List<string>, string> {
        public string Convert(List<string> source, ResolutionContext context)
            => String.Join("<//>", source);
    }
    private class ListConverter : IValueConverter<string, List<string>> {
        public List<string> Convert(string source, ResolutionContext context)
            => source.Split("<//>").ToList();
    }
    private class InstructionStringConverter : IValueConverter<List<Instruction>, string> {
        public string Convert(List<Instruction> source, ResolutionContext context)
            => String.Join("<//>", source.Select(instruction => instruction.Text));
    }
    private class InstructionListConverter : IValueConverter<string, List<Instruction>> {
        public List<Instruction> Convert(string source, ResolutionContext context)
            => source.Split("<//>").ToList().Select(text => new Instruction() {Text = text}).ToList();
    }
}